import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as P}from"./index-DJO9vBfz.js";import{c as x}from"./utils-CytzSlOG.js";import{H as d,a as o,b as t,c as n}from"./hive-tokens-BKUtHA8Z.js";import{B as h}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import{c}from"./createLucideIcon-WpwZgzX-.js";import{E as A}from"./ellipsis-D7-MrO0F.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=c("Laptop",[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",key:"tarvll"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=c("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=c("PanelLeft",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=c("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=c("Tablet",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]]),I=[{value:"auto",label:"Automatic",description:"Adapts to your screen size and usage patterns"},{value:"sidebar",label:"Sidebar",description:"Always show navigation in a side panel"},{value:"tabs",label:"Top Tabs",description:"Show navigation as tabs at the top"}];function y({value:s,onChange:p,className:b}){return e.jsx("div",{className:x("space-y-4",b),children:e.jsx("div",{className:"space-y-3",children:I.map(i=>e.jsxs("label",{className:x("flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",s===i.value?"border-[var(--hive-brand-gold)] bg-[var(--hive-brand-gold)]/5":"border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-interactive)]"),children:[e.jsx("input",{type:"radio",name:"navigation-preference",value:i.value,checked:s===i.value,onChange:()=>p(i.value),className:"mt-1 w-4 h-4 text-[var(--hive-brand-gold)] bg-transparent border-[var(--hive-border-primary)] focus:ring-[var(--hive-brand-gold)] focus:ring-2"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:i.label}),s===i.value&&e.jsx("span",{className:"text-xs px-2 py-1 bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] rounded-full font-medium",children:"Active"})]}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)] mt-1",children:i.description})]})]},i.value))})})}y.__docgenInfo={description:"",methods:[],displayName:"NavigationPreferences",props:{value:{required:!0,tsType:{name:"union",raw:"'auto' | 'sidebar' | 'tabs'",elements:[{name:"literal",value:"'auto'"},{name:"literal",value:"'sidebar'"},{name:"literal",value:"'tabs'"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: NavigationStyle) => void",signature:{arguments:[{type:{name:"union",raw:"'auto' | 'sidebar' | 'tabs'",elements:[{name:"literal",value:"'auto'"},{name:"literal",value:"'sidebar'"},{name:"literal",value:"'tabs'"}]},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const G={title:"01-Atoms/Navigation Preferences - COMPLETE DEFINITION",component:y,parameters:{docs:{description:{component:`
## 🎯 HIVE Navigation Preferences - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The intelligent navigation preference selector for University at Buffalo adaptive interface customization.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Navigation Modes** - Auto, sidebar, top tabs for different user workflow preferences
- **Smart Selection Interface** - Radio button design with clear visual feedback
- **Adaptive Intelligence** - Auto mode adapts to screen size and usage patterns
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Responsive Design** - Optimized for all screen sizes and device types
- **Accessibility Ready** - Proper radio button semantics and keyboard navigation
- **Visual Feedback** - Clear active states and hover interactions
- **Campus Workflow** - Built for University at Buffalo student interface preferences

### 🎓 **UB ACADEMIC CONTEXT**
Perfect for University at Buffalo interface customization:
- **Study Preferences** - Sidebar for focused academic work, tabs for quick switching
- **Device Adaptation** - Auto mode for students switching between phone/laptop/tablet
- **Workflow Optimization** - Different navigation for different academic tasks
- **Accessibility Needs** - Customizable interface for diverse student requirements
- **Campus Mobility** - Navigation that adapts to on-the-go vs seated study sessions
- **Multi-tasking Support** - Interface preferences for managing multiple courses

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Controls** - Large, accessible radio buttons for mobile selection
- **Clear Visual Hierarchy** - Easy-to-scan options with descriptions
- **Responsive Layout** - Adapts beautifully from mobile to desktop
- **Smart Defaults** - Auto mode provides intelligent navigation for mobile users
`}}},tags:["autodocs"],argTypes:{value:{control:"select",options:["auto","sidebar","tabs"],description:"Current navigation preference"}}},r=({initialValue:s="auto"})=>{const[p,b]=P.useState(s);return e.jsx(y,{value:p,onChange:b})},l={render:()=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(d,{children:[e.jsxs(o,{children:[e.jsx(t,{children:"Navigation Preferences"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Choose how you'd like to navigate the HIVE platform"})]}),e.jsx(n,{children:e.jsx(r,{})})]})})},v={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(d,{children:[e.jsxs(o,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(h,{variant:"success",children:"🧭 NAVIGATION OPTIONS"}),"Navigation Preference Types"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 distinct navigation modes for different University at Buffalo student workflows and preferences"})]}),e.jsx(n,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Automatic Mode:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Smart Adaptation:"}),e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Automatically adapts to your screen size and usage patterns for optimal UB student experience"})]}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(M,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Mobile"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Bottom tabs for thumb navigation"})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(E,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Tablet"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Collapsible sidebar for portrait/landscape"})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(V,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Desktop"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Full sidebar for productivity workflows"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Sidebar Mode:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Persistent Sidebar:"}),e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Always show navigation in a side panel for consistent access to academic tools"})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(B,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Benefits"})]}),e.jsxs("ul",{className:"space-y-1",children:[e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Quick course switching"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Persistent tool access"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Efficient for multi-tasking"})})]})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(g,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Best For"})]}),e.jsxs("ul",{className:"space-y-1",children:[e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Desktop study sessions"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Research workflows"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Large screen productivity"})})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Top Tabs Mode:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Horizontal Tabs:"}),e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Show navigation as tabs at the top for clean, focused academic interface"})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(A,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Benefits"})]}),e.jsxs("ul",{className:"space-y-1",children:[e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Maximized content area"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Clean, minimal interface"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Browser-like navigation"})})]})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(g,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Best For"})]}),e.jsxs("ul",{className:"space-y-1",children:[e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Reading-focused tasks"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Single-task workflows"})}),e.jsx("li",{children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"• Presentation mode"})})]})]})]})]})]})]})})]}),e.jsxs(d,{children:[e.jsxs(o,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(h,{variant:"info",children:"🎨 VISUAL STATES"}),"Preference Selection States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Clear visual feedback for different selection and interaction states"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Selection States:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Auto Selected:"}),e.jsx(r,{initialValue:"auto"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Sidebar Selected:"}),e.jsx(r,{initialValue:"sidebar"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Tabs Selected:"}),e.jsx(r,{initialValue:"tabs"})]})]})]})})})]}),e.jsxs(d,{children:[e.jsxs(o,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(h,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Usage Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Navigation preferences in actual University at Buffalo student workflow contexts"})]}),e.jsxs(n,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Workflow Scenarios:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Session (Desktop):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Research workflow with multiple course spaces, academic tools, and library resources"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Between Classes (Mobile):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Quick access to notifications, messages, and schedule while walking across campus"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Reading Assignment (Tablet):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Focused reading with minimal distractions and maximized content area"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Task Preferences:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Navigation Preferences by Academic Activity"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Research & Writing:"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Sidebar preferred for quick access to research tools, citation managers, and academic databases"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Reading:"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Tabs preferred for distraction-free reading with full content focus"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Group Projects:"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Sidebar for managing multiple project spaces, team communications, and shared tools"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Mobile Campus Life:"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Auto mode adapts to device orientation and context while moving between classes"})]})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Accessibility & Customization:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Navigation preferences support diverse University at Buffalo student needs and accessibility requirements:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Motor Accessibility:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Persistent sidebar reduces navigation gestures and provides consistent target locations"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Visual Focus:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Top tabs minimize visual clutter for students with attention or visual processing needs"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Cognitive Load:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Auto mode provides contextual navigation without requiring preference decisions"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Device Switching:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2",children:[e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Seamless experience across phone, tablet, and laptop for campus mobility"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Real Campus Context Examples:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Daily UB Student Scenarios"}),e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-sm",weight:"medium",className:"mb-2",children:"8:00 AM - Breakfast at Student Union"}),e.jsx(r,{initialValue:"auto"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Phone in portrait: Auto mode shows bottom tabs for checking today's schedule and assignments"})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-sm",weight:"medium",className:"mb-2",children:"10:30 AM - CSE 331 Lecture"}),e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Tablet in landscape: Tabs for distraction-free note-taking and slide viewing"})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-sm",weight:"medium",className:"mb-2",children:"2:00 PM - Lockwood Library Study"}),e.jsx(r,{initialValue:"sidebar"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Laptop: Sidebar for research workflow with course spaces, library databases, citation tools"})]}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-sm",weight:"medium",className:"mb-2",children:"6:00 PM - Dorm Room Assignment"}),e.jsx(r,{initialValue:"tabs"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Personal laptop: Tabs for focused writing with minimized navigation distractions"})]})]})})]})})]})]})]})]})},m={render:()=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(d,{children:[e.jsxs(o,{children:[e.jsx(t,{children:"Navigation Preferences Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Try different navigation preference selections"})]}),e.jsx(n,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive navigation preference testing for University at Buffalo interface customization"})]})})]})})};var u,N,f;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Navigation Preferences</CardTitle>
          <Text variant="body-sm" color="secondary">
            Choose how you'd like to navigate the HIVE platform
          </Text>
        </CardHeader>
        <CardContent>
          <NavigationPreferencesWrapper />
        </CardContent>
      </Card>
    </div>
}`,...(f=(N=l.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var j,T,w;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Navigation Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🧭 NAVIGATION OPTIONS</Badge>
            Navigation Preference Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 distinct navigation modes for different University at Buffalo student workflows and preferences
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Automatic Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Smart Adaptation:</Text>
                  <NavigationPreferencesWrapper initialValue="auto" />
                  <Text variant="body-sm" color="secondary">
                    Automatically adapts to your screen size and usage patterns for optimal UB student experience
                  </Text>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Mobile</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Bottom tabs for thumb navigation</Text>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Tablet className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Tablet</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Collapsible sidebar for portrait/landscape</Text>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Desktop</Text>
                    </div>
                    <Text variant="body-xs" color="secondary">Full sidebar for productivity workflows</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Sidebar Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Persistent Sidebar:</Text>
                  <NavigationPreferencesWrapper initialValue="sidebar" />
                  <Text variant="body-sm" color="secondary">
                    Always show navigation in a side panel for consistent access to academic tools
                  </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Sidebar className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Benefits</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Quick course switching</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Persistent tool access</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Efficient for multi-tasking</Text></li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Best For</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Desktop study sessions</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Research workflows</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Large screen productivity</Text></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Top Tabs Mode:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Horizontal Tabs:</Text>
                  <NavigationPreferencesWrapper initialValue="tabs" />
                  <Text variant="body-sm" color="secondary">
                    Show navigation as tabs at the top for clean, focused academic interface
                  </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <MoreHorizontal className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Benefits</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Maximized content area</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Clean, minimal interface</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Browser-like navigation</Text></li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                      <Text variant="body-sm" weight="medium">Best For</Text>
                    </div>
                    <ul className="space-y-1">
                      <li><Text variant="body-xs" color="secondary">• Reading-focused tasks</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Single-task workflows</Text></li>
                      <li><Text variant="body-xs" color="secondary">• Presentation mode</Text></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VISUAL STATES</Badge>
            Preference Selection States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Clear visual feedback for different selection and interaction states
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Selection States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Auto Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="auto" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Sidebar Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="sidebar" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tabs Selected:</Text>
                  <NavigationPreferencesWrapper initialValue="tabs" />
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
            Real Campus Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Navigation preferences in actual University at Buffalo student workflow contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Workflow Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Workflow Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Session (Desktop):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="sidebar" />
                    <Text variant="body-xs" color="secondary">
                      Research workflow with multiple course spaces, academic tools, and library resources
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Between Classes (Mobile):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Quick access to notifications, messages, and schedule while walking across campus
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Reading Assignment (Tablet):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <NavigationPreferencesWrapper initialValue="tabs" />
                    <Text variant="body-xs" color="secondary">
                      Focused reading with minimal distractions and maximized content area
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Academic Task Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Task Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Navigation Preferences by Academic Activity
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Research & Writing:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="sidebar" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Sidebar preferred for quick access to research tools, citation managers, and academic databases
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Course Reading:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="tabs" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Tabs preferred for distraction-free reading with full content focus
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Group Projects:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="sidebar" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Sidebar for managing multiple project spaces, team communications, and shared tools
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Mobile Campus Life:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                        <NavigationPreferencesWrapper initialValue="auto" />
                        <Text variant="body-xs" color="secondary" className="mt-2">
                          Auto mode adapts to device orientation and context while moving between classes
                        </Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Accessibility Considerations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Accessibility & Customization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Navigation preferences support diverse University at Buffalo student needs and accessibility requirements:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Motor Accessibility:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="sidebar" />
                    <Text variant="body-xs" color="secondary">
                      Persistent sidebar reduces navigation gestures and provides consistent target locations
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Visual Focus:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="tabs" />
                    <Text variant="body-xs" color="secondary">
                      Top tabs minimize visual clutter for students with attention or visual processing needs
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Cognitive Load:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Auto mode provides contextual navigation without requiring preference decisions
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Device Switching:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-2">
                    <NavigationPreferencesWrapper initialValue="auto" />
                    <Text variant="body-xs" color="secondary">
                      Seamless experience across phone, tablet, and laptop for campus mobility
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Context Examples */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Real Campus Context Examples:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Daily UB Student Scenarios
                </Text>
                
                <div className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">8:00 AM - Breakfast at Student Union</Text>
                      <NavigationPreferencesWrapper initialValue="auto" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Phone in portrait: Auto mode shows bottom tabs for checking today's schedule and assignments
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">10:30 AM - CSE 331 Lecture</Text>
                      <NavigationPreferencesWrapper initialValue="tabs" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Tablet in landscape: Tabs for distraction-free note-taking and slide viewing
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">2:00 PM - Lockwood Library Study</Text>
                      <NavigationPreferencesWrapper initialValue="sidebar" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Laptop: Sidebar for research workflow with course spaces, library databases, citation tools
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" weight="medium" className="mb-2">6:00 PM - Dorm Room Assignment</Text>
                      <NavigationPreferencesWrapper initialValue="tabs" />
                      <Text variant="body-xs" color="secondary" className="mt-2">
                        Personal laptop: Tabs for focused writing with minimized navigation distractions
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
}`,...(w=(T=v.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var k,C,S;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Navigation Preferences Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Try different navigation preference selections
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <NavigationPreferencesWrapper />
            <Text variant="body-sm" color="secondary">
              Interactive navigation preference testing for University at Buffalo interface customization
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(S=(C=m.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};const Q=["Default","CompleteShowcase","Playground"];export{v as CompleteShowcase,l as Default,m as Playground,Q as __namedExportsOrder,G as default};
