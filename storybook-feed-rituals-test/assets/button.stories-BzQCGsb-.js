import{j as a}from"./jsx-runtime-B9GTzLod.js";import{B as e}from"./button-DXaHCZ7Q.js";import{H as r,c as t,a as c,b as d}from"./hive-card-DIMxrd4t.js";import{B as l}from"./badge-BLajwy0n.js";import{T as s}from"./text-BOe2XosQ.js";import{a as I}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";/* empty css                    */import{P as i}from"./plus-BTyRuzWD.js";import{A as N}from"./arrow-right-CLTrdEkf.js";import{D as g}from"./download-B_gmnu9b.js";import{B as m}from"./book-open-BAcXQadr.js";import{U as n}from"./users-B5XgMSov.js";import{C as b}from"./calendar-RwBiWFlj.js";import{H as v}from"./heart-BuGzDzw2.js";import{S as u}from"./share-c7yMMZbP.js";import{M as o}from"./message-circle-CnQJGxxu.js";import{Z as f}from"./zap-BzDMfB1h.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./utils-CytzSlOG.js";import"./loader-circle-C0fUCed1.js";import"./createLucideIcon-DtX30ipI.js";import"./index-BwobEAja.js";import"./v4-CtRu48qb.js";const sa={title:"01-Atoms/Button - COMPLETE DEFINITION",component:e,parameters:{docs:{description:{component:`
## 🔘 HIVE Button - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive button system for University at Buffalo HIVE platform interface interactions and user actions.

### 🎯 **COMPONENT EXCELLENCE**
- **6 Semantic Variants** - Primary, secondary, ghost, destructive, outline, accent for all interaction contexts
- **4 Size Options** - Small, medium, large, icon for flexible interface layouts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Loading States** - Built-in spinner animation for async operations
- **Icon Support** - Left/right icon positioning with proper spacing
- **Motion Design** - Framer Motion hover effects and smooth transitions
- **Accessibility Ready** - Proper focus states, keyboard navigation, and screen reader support
- **Campus Interface** - Built for University at Buffalo student platform interactions

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform interactions:
- **Space Actions** - Join spaces, create content, coordinate activities
- **Academic Workflows** - Submit assignments, join study groups, access resources
- **Social Interactions** - Like posts, share content, comment on discussions
- **Tool Building** - Create tools, deploy projects, manage configurations
- **Profile Management** - Edit profiles, update settings, customize dashboards
- **Event Coordination** - RSVP to events, create gatherings, manage calendars

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Minimum 44px touch targets for all variants
- **Responsive Design** - Adaptive sizing and spacing for mobile interfaces
- **Clear Visual Feedback** - Immediate response to touch interactions
- **Accessibility** - Screen reader friendly with proper ARIA labels
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","destructive","outline","accent"],description:"Button variant styling"},size:{control:"select",options:["sm","md","lg","icon"],description:"Button size"},loading:{control:"boolean",description:"Loading state with spinner"},fullWidth:{control:"boolean",description:"Full width button"},disabled:{control:"boolean",description:"Disabled state"},iconPosition:{control:"select",options:["left","right"],description:"Icon position"},onClick:{action:"clicked",description:"Button click handler"}}},h={args:{children:"Join Space",variant:"primary",size:"md",loading:!1,disabled:!1,onClick:I("button-clicked")},render:y=>a.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:a.jsx(r,{children:a.jsxs(t,{className:"space-y-4",children:[a.jsx(s,{variant:"body-md",color:"primary",children:"HIVE button system for University at Buffalo platform interactions:"}),a.jsx(e,{...y}),a.jsx(s,{variant:"body-sm",color:"secondary",children:"Interactive button component with semantic variants and motion design"})]})})})},p={render:()=>a.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[a.jsxs(r,{children:[a.jsxs(c,{children:[a.jsxs(d,{className:"flex items-center gap-3",children:[a.jsx(l,{variant:"success",children:"🔘 BUTTON VARIANTS"}),"Semantic Button Types"]}),a.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"6 semantic button variants for comprehensive University at Buffalo HIVE platform interaction design"})]}),a.jsx(t,{children:a.jsx("div",{className:"space-y-8",children:a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Core Button Variants:"}),a.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Primary Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"primary",icon:a.jsx(i,{className:"h-4 w-4"}),children:"Join Space"}),a.jsx(e,{variant:"primary",icon:a.jsx(N,{className:"h-4 w-4"}),iconPosition:"right",children:"Get Started"}),a.jsx(e,{variant:"primary",icon:a.jsx(g,{className:"h-4 w-4"}),children:"Download Tool"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Primary actions for space joining, onboarding, and main platform features"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Secondary Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"secondary",icon:a.jsx(m,{className:"h-4 w-4"}),children:"View Details"}),a.jsx(e,{variant:"secondary",icon:a.jsx(n,{className:"h-4 w-4"}),children:"See Members"}),a.jsx(e,{variant:"secondary",icon:a.jsx(b,{className:"h-4 w-4"}),children:"Check Schedule"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Secondary actions for information access and supplementary features"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost (Subtle) Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"ghost",icon:a.jsx(v,{className:"h-4 w-4"}),children:"Like"}),a.jsx(e,{variant:"ghost",icon:a.jsx(u,{className:"h-4 w-4"}),children:"Share"}),a.jsx(e,{variant:"ghost",icon:a.jsx(o,{className:"h-4 w-4"}),children:"Comment"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Subtle actions for social interactions and lightweight features"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Outline Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"outline",children:"Learn More"}),a.jsx(e,{variant:"outline",children:"Browse All"}),a.jsx(e,{variant:"outline",children:"Contact Admin"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Outlined buttons for navigation and exploration actions"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Accent (Special) Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"accent",icon:a.jsx(f,{className:"h-4 w-4"}),children:"Activate Space"}),a.jsx(e,{variant:"accent",children:"Premium Feature"}),a.jsx(e,{variant:"accent",children:"Special Access"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Gold accent buttons for special features and premium actions"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"red",weight:"medium",children:"Destructive Actions:"}),a.jsxs("div",{className:"flex flex-wrap gap-3",children:[a.jsx(e,{variant:"destructive",children:"Leave Space"}),a.jsx(e,{variant:"destructive",children:"Delete Tool"}),a.jsx(e,{variant:"destructive",children:"Remove Content"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Destructive actions for irreversible operations and warnings"})]})]})]})})})]}),a.jsxs(r,{children:[a.jsxs(c,{children:[a.jsxs(d,{className:"flex items-center gap-3",children:[a.jsx(l,{variant:"info",children:"📏 BUTTON SIZES"}),"Size Variations"]}),a.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 button sizes for different interface contexts and responsive design"})]}),a.jsx(t,{children:a.jsx("div",{className:"space-y-6",children:a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Options:"}),a.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (Compact):"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{size:"sm",variant:"primary",children:"Join"}),a.jsx(e,{size:"sm",variant:"secondary",children:"View"}),a.jsx(e,{size:"sm",variant:"ghost",children:"Like"}),a.jsx(e,{size:"sm",variant:"outline",children:"More"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"32px height - Compact buttons for dense interfaces, action bars, and mobile layouts"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (Standard):"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{size:"md",variant:"primary",children:"Join Space"}),a.jsx(e,{size:"md",variant:"secondary",children:"View Details"}),a.jsx(e,{size:"md",variant:"ghost",children:"Add Comment"}),a.jsx(e,{size:"md",variant:"outline",children:"Learn More"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"40px height - Standard buttons for most platform interactions and form submissions"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (Prominent):"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{size:"lg",variant:"primary",children:"Get Started"}),a.jsx(e,{size:"lg",variant:"secondary",children:"Browse Spaces"}),a.jsx(e,{size:"lg",variant:"accent",children:"Activate Account"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"48px height - Large buttons for hero sections, call-to-action, and primary navigation"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Icon Only:"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{size:"icon",variant:"primary",children:a.jsx(i,{className:"h-4 w-4"})}),a.jsx(e,{size:"icon",variant:"secondary",children:a.jsx(v,{className:"h-4 w-4"})}),a.jsx(e,{size:"icon",variant:"ghost",children:a.jsx(u,{className:"h-4 w-4"})}),a.jsx(e,{size:"icon",variant:"outline",children:a.jsx(o,{className:"h-4 w-4"})})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"40x40px - Icon-only buttons for toolbars, social actions, and compact interfaces"})]})]})]})})})]}),a.jsxs(r,{children:[a.jsxs(c,{children:[a.jsxs(d,{className:"flex items-center gap-3",children:[a.jsx(l,{variant:"primary",children:"⚡ INTERACTIVE STATES"}),"Loading, Disabled, and Icon Features"]}),a.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Interactive button states for user feedback and enhanced accessibility"})]}),a.jsx(t,{children:a.jsx("div",{className:"space-y-6",children:a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive Features:"}),a.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Loading States:"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{variant:"primary",loading:!0,children:"Joining Space..."}),a.jsx(e,{variant:"secondary",loading:!0,children:"Submitting..."}),a.jsx(e,{variant:"accent",loading:!0,children:"Activating..."})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Loading states with spinner animation for async operations and user feedback"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Disabled States:"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{variant:"primary",disabled:!0,children:"Space Full"}),a.jsx(e,{variant:"secondary",disabled:!0,children:"Unavailable"}),a.jsx(e,{variant:"destructive",disabled:!0,children:"Cannot Delete"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Disabled states for unavailable actions and conditional interactions"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Icon Positioning:"}),a.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[a.jsx(e,{variant:"primary",icon:a.jsx(i,{className:"h-4 w-4"}),iconPosition:"left",children:"Create Tool"}),a.jsx(e,{variant:"secondary",icon:a.jsx(N,{className:"h-4 w-4"}),iconPosition:"right",children:"Continue"}),a.jsx(e,{variant:"outline",icon:a.jsx(g,{className:"h-4 w-4"}),iconPosition:"left",children:"Export Data"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Left and right icon positioning with proper spacing and semantic meaning"})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Full Width Options:"}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(e,{variant:"primary",fullWidth:!0,icon:a.jsx(n,{className:"h-4 w-4"}),children:"Join University at Buffalo Students"}),a.jsx(e,{variant:"secondary",fullWidth:!0,icon:a.jsx(m,{className:"h-4 w-4"}),children:"Browse All Course Spaces"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Full-width buttons for mobile interfaces, forms, and prominent calls-to-action"})]})]})]})})})]}),a.jsxs(r,{children:[a.jsxs(c,{children:[a.jsxs(d,{className:"flex items-center gap-3",children:[a.jsx(l,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Button Usage Scenarios"]}),a.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Button usage in actual University at Buffalo student workflow and campus platform interaction contexts"})]}),a.jsxs(t,{className:"space-y-8",children:[a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Workflow Buttons:"}),a.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:a.jsxs("div",{className:"space-y-4",children:[a.jsx(s,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 Algorithm Analysis Course Interactions"}),a.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Space Actions:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"primary",fullWidth:!0,icon:a.jsx(i,{className:"h-4 w-4"}),children:"Join CSE 331 Space"}),a.jsx(e,{variant:"secondary",fullWidth:!0,icon:a.jsx(m,{className:"h-4 w-4"}),children:"Access Course Materials"}),a.jsx(e,{variant:"outline",fullWidth:!0,icon:a.jsx(n,{className:"h-4 w-4"}),children:"Find Study Group"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Primary actions for course engagement and academic resource access"})]})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Assignment Workflow:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"accent",fullWidth:!0,icon:a.jsx(f,{className:"h-4 w-4"}),children:"Submit Algorithm Project"}),a.jsx(e,{variant:"secondary",fullWidth:!0,icon:a.jsx(g,{className:"h-4 w-4"}),children:"Download Starter Code"}),a.jsx(e,{variant:"ghost",fullWidth:!0,icon:a.jsx(o,{className:"h-4 w-4"}),children:"Ask Professor Question"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Assignment submission and academic support interactions"})]})]})]})]})})]}),a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Social Platform Buttons:"}),a.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:a.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Feed Interactions:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"ghost",size:"sm",icon:a.jsx(v,{className:"h-4 w-4"}),children:"Like Post"}),a.jsx(e,{variant:"ghost",size:"sm",icon:a.jsx(o,{className:"h-4 w-4"}),children:"Comment"}),a.jsx(e,{variant:"ghost",size:"sm",icon:a.jsx(u,{className:"h-4 w-4"}),children:"Share"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Social interactions for campus community engagement"})]})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Space Management:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"primary",size:"sm",children:"Create Space"}),a.jsx(e,{variant:"secondary",size:"sm",children:"Invite Members"}),a.jsx(e,{variant:"destructive",size:"sm",children:"Leave Space"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Space administration and community building actions"})]})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Tool Building:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"accent",size:"sm",icon:a.jsx(f,{className:"h-4 w-4"}),children:"Deploy Tool"}),a.jsx(e,{variant:"outline",size:"sm",children:"Preview Tool"}),a.jsx(e,{variant:"secondary",size:"sm",children:"Save Draft"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Tool creation and platform building workflows"})]})]})]})})]}),a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Living & Events:"}),a.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:a.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Residential Community:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"primary",fullWidth:!0,icon:a.jsx(n,{className:"h-4 w-4"}),children:"Join Ellicott Complex Floor"}),a.jsx(e,{variant:"secondary",fullWidth:!0,icon:a.jsx(b,{className:"h-4 w-4"}),children:"RSVP Floor Event"}),a.jsx(e,{variant:"outline",fullWidth:!0,children:"Browse Dorm Activities"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Residential life coordination and community building activities"})]})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Events:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"accent",fullWidth:!0,icon:a.jsx(i,{className:"h-4 w-4"}),children:"Create Study Session"}),a.jsx(e,{variant:"primary",fullWidth:!0,icon:a.jsx(b,{className:"h-4 w-4"}),children:"Attend Homecoming"}),a.jsx(e,{variant:"secondary",fullWidth:!0,children:"View All Events"})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Event creation and participation for campus social life"})]})]})]})})]}),a.jsxs("div",{className:"space-y-4",children:[a.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Navigation:"}),a.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[a.jsx(s,{variant:"body-md",color:"primary",children:"Mobile-optimized button usage for on-campus platform access:"}),a.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Walking to Class:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"primary",size:"lg",fullWidth:!0,icon:a.jsx(m,{className:"h-4 w-4"}),children:"Check Today's Assignments"}),a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{variant:"ghost",size:"icon",children:a.jsx(v,{className:"h-4 w-4"})}),a.jsx(e,{variant:"ghost",size:"icon",children:a.jsx(o,{className:"h-4 w-4"})}),a.jsx(e,{variant:"ghost",size:"icon",children:a.jsx(u,{className:"h-4 w-4"})}),a.jsx(e,{variant:"secondary",size:"sm",className:"flex-1",children:"Quick Actions"})]})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Large buttons and icon actions for quick mobile access while moving around campus"})]})]}),a.jsxs("div",{className:"space-y-3",children:[a.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Library Study Time:"}),a.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(e,{variant:"accent",fullWidth:!0,icon:a.jsx(n,{className:"h-4 w-4"}),children:"Find Study Group in Lockwood"}),a.jsx(e,{variant:"primary",fullWidth:!0,icon:a.jsx(i,{className:"h-4 w-4"}),children:"Create Study Session"}),a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{variant:"outline",size:"sm",className:"flex-1",children:"Resources"}),a.jsx(e,{variant:"secondary",size:"sm",className:"flex-1",children:"Schedule"})]})]}),a.jsx(s,{variant:"body-xs",color:"secondary",children:"Study coordination and academic resource access during library sessions"})]})]})]})]})]})]})]})]})},x={args:{children:"Join Space",variant:"primary",size:"md",loading:!1,disabled:!1,fullWidth:!1,iconPosition:"left",onClick:I("playground-clicked")},render:y=>a.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:a.jsxs(r,{children:[a.jsxs(c,{children:[a.jsx(d,{children:"Button Playground"}),a.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different button configurations"})]}),a.jsx(t,{className:"p-6",children:a.jsxs("div",{className:"space-y-4",children:[a.jsx(e,{...y}),a.jsx(s,{variant:"body-sm",color:"secondary",children:"Interactive button testing for University at Buffalo HIVE platform interface design"})]})})]})})};var j,B,w;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Join Space',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: action('button-clicked')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE button system for University at Buffalo platform interactions:
          </Text>
          <Button {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive button component with semantic variants and motion design
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(w=(B=h.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var T,C,S;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🔘 BUTTON VARIANTS</Badge>
            Semantic Button Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 semantic button variants for comprehensive University at Buffalo HIVE platform interaction design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Button Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Primary Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
                      Join Space
                    </Button>
                    <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                      Get Started
                    </Button>
                    <Button variant="primary" icon={<Download className="h-4 w-4" />}>
                      Download Tool
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Primary actions for space joining, onboarding, and main platform features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Secondary Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" icon={<BookOpen className="h-4 w-4" />}>
                      View Details
                    </Button>
                    <Button variant="secondary" icon={<Users className="h-4 w-4" />}>
                      See Members
                    </Button>
                    <Button variant="secondary" icon={<Calendar className="h-4 w-4" />}>
                      Check Schedule
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Secondary actions for information access and supplementary features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Subtle) Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost" icon={<Heart className="h-4 w-4" />}>
                      Like
                    </Button>
                    <Button variant="ghost" icon={<Share className="h-4 w-4" />}>
                      Share
                    </Button>
                    <Button variant="ghost" icon={<MessageCircle className="h-4 w-4" />}>
                      Comment
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Subtle actions for social interactions and lightweight features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Outline Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      Learn More
                    </Button>
                    <Button variant="outline">
                      Browse All
                    </Button>
                    <Button variant="outline">
                      Contact Admin
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Outlined buttons for navigation and exploration actions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Accent (Special) Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="accent" icon={<Zap className="h-4 w-4" />}>
                      Activate Space
                    </Button>
                    <Button variant="accent">
                      Premium Feature
                    </Button>
                    <Button variant="accent">
                      Special Access
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Gold accent buttons for special features and premium actions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="red" weight="medium">Destructive Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="destructive">
                      Leave Space
                    </Button>
                    <Button variant="destructive">
                      Delete Tool
                    </Button>
                    <Button variant="destructive">
                      Remove Content
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Destructive actions for irreversible operations and warnings
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 BUTTON SIZES</Badge>
            Size Variations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 button sizes for different interface contexts and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="sm" variant="primary">Join</Button>
                    <Button size="sm" variant="secondary">View</Button>
                    <Button size="sm" variant="ghost">Like</Button>
                    <Button size="sm" variant="outline">More</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    32px height - Compact buttons for dense interfaces, action bars, and mobile layouts
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="md" variant="primary">Join Space</Button>
                    <Button size="md" variant="secondary">View Details</Button>
                    <Button size="md" variant="ghost">Add Comment</Button>
                    <Button size="md" variant="outline">Learn More</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    40px height - Standard buttons for most platform interactions and form submissions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="lg" variant="primary">Get Started</Button>
                    <Button size="lg" variant="secondary">Browse Spaces</Button>
                    <Button size="lg" variant="accent">Activate Account</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    48px height - Large buttons for hero sections, call-to-action, and primary navigation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Only:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="icon" variant="primary">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    40x40px - Icon-only buttons for toolbars, social actions, and compact interfaces
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
            Loading, Disabled, and Icon Features
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive button states for user feedback and enhanced accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading States:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" loading>
                      Joining Space...
                    </Button>
                    <Button variant="secondary" loading>
                      Submitting...
                    </Button>
                    <Button variant="accent" loading>
                      Activating...
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Loading states with spinner animation for async operations and user feedback
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled States:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" disabled>
                      Space Full
                    </Button>
                    <Button variant="secondary" disabled>
                      Unavailable
                    </Button>
                    <Button variant="destructive" disabled>
                      Cannot Delete
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Disabled states for unavailable actions and conditional interactions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Positioning:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" icon={<Plus className="h-4 w-4" />} iconPosition="left">
                      Create Tool
                    </Button>
                    <Button variant="secondary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                      Continue
                    </Button>
                    <Button variant="outline" icon={<Download className="h-4 w-4" />} iconPosition="left">
                      Export Data
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Left and right icon positioning with proper spacing and semantic meaning
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Full Width Options:</Text>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth icon={<Users className="h-4 w-4" />}>
                      Join University at Buffalo Students
                    </Button>
                    <Button variant="secondary" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                      Browse All Course Spaces
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Full-width buttons for mobile interfaces, forms, and prominent calls-to-action
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
            Real Campus Button Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Button usage in actual University at Buffalo student workflow and campus platform interaction contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Workflow Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Workflow Buttons:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 Algorithm Analysis Course Interactions
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Space Actions:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Button variant="primary" fullWidth icon={<Plus className="h-4 w-4" />}>
                          Join CSE 331 Space
                        </Button>
                        <Button variant="secondary" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                          Access Course Materials
                        </Button>
                        <Button variant="outline" fullWidth icon={<Users className="h-4 w-4" />}>
                          Find Study Group
                        </Button>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Primary actions for course engagement and academic resource access
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Assignment Workflow:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Button variant="accent" fullWidth icon={<Zap className="h-4 w-4" />}>
                          Submit Algorithm Project
                        </Button>
                        <Button variant="secondary" fullWidth icon={<Download className="h-4 w-4" />}>
                          Download Starter Code
                        </Button>
                        <Button variant="ghost" fullWidth icon={<MessageCircle className="h-4 w-4" />}>
                          Ask Professor Question
                        </Button>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Assignment submission and academic support interactions
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Social Platform Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Platform Buttons:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Feed Interactions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" icon={<Heart className="h-4 w-4" />}>
                        Like Post
                      </Button>
                      <Button variant="ghost" size="sm" icon={<MessageCircle className="h-4 w-4" />}>
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Share className="h-4 w-4" />}>
                        Share
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Social interactions for campus community engagement
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Space Management:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" size="sm">
                        Create Space
                      </Button>
                      <Button variant="secondary" size="sm">
                        Invite Members
                      </Button>
                      <Button variant="destructive" size="sm">
                        Leave Space
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Space administration and community building actions
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tool Building:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="accent" size="sm" icon={<Zap className="h-4 w-4" />}>
                        Deploy Tool
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview Tool
                      </Button>
                      <Button variant="secondary" size="sm">
                        Save Draft
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Tool creation and platform building workflows
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Residential Life Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Living & Events:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Community:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" fullWidth icon={<Users className="h-4 w-4" />}>
                        Join Ellicott Complex Floor
                      </Button>
                      <Button variant="secondary" fullWidth icon={<Calendar className="h-4 w-4" />}>
                        RSVP Floor Event
                      </Button>
                      <Button variant="outline" fullWidth>
                        Browse Dorm Activities
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Residential life coordination and community building activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Events:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="accent" fullWidth icon={<Plus className="h-4 w-4" />}>
                        Create Study Session
                      </Button>
                      <Button variant="primary" fullWidth icon={<Calendar className="h-4 w-4" />}>
                        Attend Homecoming
                      </Button>
                      <Button variant="secondary" fullWidth>
                        View All Events
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Event creation and participation for campus social life
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Campus Usage */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized button usage for on-campus platform access:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Walking to Class:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" size="lg" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                        Check Today's Assignments
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          Quick Actions
                        </Button>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Large buttons and icon actions for quick mobile access while moving around campus
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Library Study Time:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="accent" fullWidth icon={<Users className="h-4 w-4" />}>
                        Find Study Group in Lockwood
                      </Button>
                      <Button variant="primary" fullWidth icon={<Plus className="h-4 w-4" />}>
                        Create Study Session
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Resources
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          Schedule
                        </Button>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Study coordination and academic resource access during library sessions
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(S=(C=p.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var k,A,z;x.parameters={...x.parameters,docs:{...(k=x.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Join Space',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    iconPosition: 'left',
    onClick: action('playground-clicked')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Button Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different button configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Button {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive button testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(z=(A=x.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};const ia=["Default","CompleteShowcase","Playground"];export{p as CompleteShowcase,h as Default,x as Playground,ia as __namedExportsOrder,sa as default};
