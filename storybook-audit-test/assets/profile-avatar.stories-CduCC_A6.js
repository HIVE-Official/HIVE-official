import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{P as s}from"./profile-avatar-DzpxHVTk.js";import{H as t,c as d,a as o,b as n}from"./hive-tokens-CKIUfcHM.js";import{B as l}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import{C as u}from"./crown-kVmBcUF4.js";import{S as x}from"./shield-C_Z4LaB7.js";import{E as h}from"./eye-off-BoT7HipX.js";import"./index-DJO9vBfz.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./index-B4HBe590.js";import"./camera-DvyA-l59.js";import"./createLucideIcon-WpwZgzX-.js";import"./upload-B79xrUhd.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const J={title:"01-Atoms/Profile Avatar - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🎯 HIVE Profile Avatar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The sophisticated avatar system for University at Buffalo student identity and status representation.

### 🏆 **COMPONENT EXCELLENCE**
- **6 Size Options** - XS to XXL for flexible interface integration across all layouts
- **3 Shape Variants** - Circle, rounded, square for different design contexts
- **5 Border Types** - None, subtle, primary, builder, verified for status indication
- **4 Status Indicators** - Online, away, busy, offline with visual presence dots
- **3 Badge Types** - Builder crown, verified shield, ghost mode for user recognition
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Edit Functionality** - Built-in photo upload with hover overlays and mobile support
- **Fallback System** - Graceful degradation from image to initials to placeholder
- **Campus Identity** - Built for University at Buffalo student profile representation

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student identity display:
- **Student Profiles** - Individual student representation across academic spaces
- **Faculty Display** - Professor and TA avatars with verification badges
- **Builder Recognition** - Special crown badges for HIVE platform builders
- **Status Awareness** - Real-time presence for study groups and collaboration
- **Privacy Control** - Ghost mode for students managing visibility
- **Academic Hierarchy** - Visual distinction between students, TAs, faculty, and builders
- **Course Interaction** - Avatar representation in course spaces and group projects

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Editing** - Large touch targets for profile photo management
- **Clear Status Indicators** - Visible presence dots and badges on mobile screens
- **Responsive Sizing** - Scales appropriately across all device sizes
- **Upload Support** - Native file upload integration for mobile photo capture
`}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl","xxl"],description:"Avatar size"},shape:{control:"select",options:["circle","rounded","square"],description:"Avatar shape"},border:{control:"select",options:["none","subtle","primary","builder","verified"],description:"Avatar border style"},onlineStatus:{control:"select",options:["online","offline","away","busy"],description:"User online status"},isBuilder:{control:"boolean",description:"Show builder crown badge"},isVerified:{control:"boolean",description:"Show verified shield badge"},ghostMode:{control:"boolean",description:"Enable ghost mode (privacy)"},showStatus:{control:"boolean",description:"Show online status indicator"},editable:{control:"boolean",description:"Enable edit functionality"},loading:{control:"boolean",description:"Loading state"}}},r={student1:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",student2:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",student3:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",faculty:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",ta:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"},c={args:{name:"Sarah Chen",src:r.student1,size:"md",shape:"circle",border:"subtle",onlineStatus:"online",showStatus:!0,isBuilder:!1,isVerified:!1,ghostMode:!1,editable:!1,loading:!1},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(t,{children:e.jsxs(d,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"University at Buffalo student profile avatar:"}),e.jsx(s,{...i}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Standard student avatar with online status for UB campus interaction"})]})})})},m={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(l,{variant:"success",children:"📏 SIZES"}),"Profile Avatar Sizes"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"6 size options for flexible integration across all University at Buffalo interface layouts"})]}),e.jsx(d,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Progression:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-end gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Alex Kim",src:r.student2,size:"xs",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"XS - Chat lists"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Maria Santos",src:r.student3,size:"sm",onlineStatus:"away",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"SM - Navigation"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Jordan Lee",src:r.student1,size:"md",onlineStatus:"online",showStatus:!0,isVerified:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"MD - Default"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Dr. Rodriguez",src:r.faculty,size:"lg",onlineStatus:"busy",showStatus:!0,isVerified:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"LG - Cards"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Taylor Wilson",src:r.ta,size:"xl",onlineStatus:"online",showStatus:!0,isBuilder:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"XL - Profiles"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Riley Chen",src:r.student2,size:"xxl",onlineStatus:"online",showStatus:!0,isBuilder:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"XXL - Headers"})]})]})})]})})})]}),e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(l,{variant:"info",children:"🔳 SHAPES & BORDERS"}),"Avatar Shapes and Border Styles"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 shapes and 5 border styles for different design contexts and user status indication"})]}),e.jsx(d,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Shape Variants:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Circle (Default):"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(s,{name:"Sarah Chen",src:r.student1,shape:"circle",size:"lg"}),e.jsx(s,{name:"Marcus Johnson",src:r.student2,shape:"circle",size:"lg",isVerified:!0}),e.jsx(s,{name:"Emily Rodriguez",src:r.student3,shape:"circle",size:"lg",isBuilder:!0})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Rounded:"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(s,{name:"David Kim",src:r.ta,shape:"rounded",size:"lg"}),e.jsx(s,{name:"Priya Patel",src:r.faculty,shape:"rounded",size:"lg",isVerified:!0}),e.jsx(s,{name:"Sam Rivera",src:r.student1,shape:"rounded",size:"lg",isBuilder:!0})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Square:"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(s,{name:"Alex Chen",src:r.student2,shape:"square",size:"lg"}),e.jsx(s,{name:"Jordan Taylor",src:r.student3,shape:"square",size:"lg",isVerified:!0}),e.jsx(s,{name:"Casey Williams",src:r.ta,shape:"square",size:"lg",isBuilder:!0})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Border Styles:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Border Types:"}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"No Border",src:r.student1,border:"none",size:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"None"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Subtle Border",src:r.student2,border:"subtle",size:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Subtle"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Primary Border",src:r.student3,border:"primary",size:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Primary"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Builder Border",src:r.ta,border:"builder",size:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Builder"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Verified Border",src:r.faculty,border:"verified",size:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Verified"})]})]})]})})]})]})})]}),e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(l,{variant:"primary",children:"🏆 STATUS & BADGES"}),"Online Status and User Recognition Badges"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive status system for University at Buffalo campus presence and user recognition"})]}),e.jsx(d,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Online Status Indicators:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Presence Status:"}),e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Online Student",src:r.student1,size:"lg",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Online"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Away Student",src:r.student2,size:"lg",onlineStatus:"away",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Away"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Busy Student",src:r.student3,size:"lg",onlineStatus:"busy",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Busy"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Offline Student",src:r.ta,size:"lg",onlineStatus:"offline",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Offline"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Usage Context:"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",weight:"medium",className:"mb-1",children:"Online - Available for study groups"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Student actively using HIVE, available for collaboration"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",weight:"medium",className:"mb-1",children:"Away - Between classes"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Moving around campus, may respond with delay"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",weight:"medium",className:"mb-1",children:"Busy - In class/studying"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Focus mode, prefer not to be disturbed"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",weight:"medium",className:"mb-1",children:"Offline - Not on campus"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Away from campus or not using platform"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Recognition Badges:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"User Types:"}),e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Platform Builder",src:r.ta,size:"lg",isBuilder:!0,onlineStatus:"online",showStatus:!0}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(u,{className:"w-3 h-3 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Builder"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Verified Faculty",src:r.faculty,size:"lg",isVerified:!0,onlineStatus:"away",showStatus:!0}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(x,{className:"w-3 h-3 text-[var(--hive-status-info)]"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Verified"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Ghost Mode",src:r.student1,size:"lg",ghostMode:!0,onlineStatus:"online",showStatus:!0}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(h,{className:"w-3 h-3 text-[var(--hive-text-muted)]"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Ghost"})]})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Badge Meanings:"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(u,{className:"w-4 h-4 text-[var(--hive-brand-gold)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Builder"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"HIVE platform contributor who creates tools and enhances campus community"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(x,{className:"w-4 h-4 text-[var(--hive-status-info)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Verified"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Confirmed University at Buffalo faculty, staff, or official organization"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(h,{className:"w-4 h-4 text-[var(--hive-text-muted)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",children:"Ghost Mode"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Student using privacy mode with limited profile visibility"})]})]})]})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(l,{variant:"secondary",children:"🔄 FALLBACKS & STATES"}),"Avatar Fallbacks and Interactive States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Graceful degradation system and interactive states for avatar management"})]}),e.jsx(d,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Fallback System:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Image → Initials → Placeholder:"}),e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Sarah Chen",src:r.student1,size:"lg",isVerified:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"With Image"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Marcus Johnson",size:"lg",isBuilder:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Initials (MJ)"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Loading User",size:"lg",loading:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Loading"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Different Name Lengths:"}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"John",size:"md"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"J"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Maria Santos",size:"md"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"MS"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Alexander Christopher Johnson",size:"md"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"AC"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive States:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Editable Avatars:"}),e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Editable Profile",src:r.student2,size:"lg",editable:!0,onEdit:()=>console.log("Edit clicked")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Hover to Edit"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{name:"Upload Photo",size:"lg",editable:!0,onUpload:i=>console.log("Upload:",i.name)}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Upload Enabled"})]})]})]})})]})]})})]}),e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(l,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Avatar Usage Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile avatar usage in actual University at Buffalo academic and social contexts"})]}),e.jsxs(d,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE 331 - Algorithm Analysis Course Space:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Course Participants"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Instructor & TAs:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3",children:[e.jsx(s,{name:"Dr. Emily Rodriguez",src:r.faculty,size:"md",isVerified:!0,onlineStatus:"away",showStatus:!0}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Dr. Emily Rodriguez"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Professor • Office Hours: Tue/Thu 2-4pm"})]})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3",children:[e.jsx(s,{name:"Alex Kim",src:r.ta,size:"md",isVerified:!0,onlineStatus:"online",showStatus:!0}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Alex Kim"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Teaching Assistant • Lab Wed 6-8pm"})]})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Students:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3",children:[e.jsx(s,{name:"Sarah Chen",src:r.student1,size:"md",onlineStatus:"online",showStatus:!0}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Sarah Chen"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Computer Science • Study Group Leader"})]})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3",children:[e.jsx(s,{name:"Marcus Johnson",src:r.student2,size:"md",onlineStatus:"busy",showStatus:!0}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Marcus Johnson"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Math/CS Double Major • In Study Session"})]})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3",children:[e.jsx(s,{name:"Jordan Lee",size:"md",ghostMode:!0,onlineStatus:"away",showStatus:!0}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Jordan Lee"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Computer Engineering • Privacy Mode"})]})]})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Algorithm Study Group - Active Session:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Live Study Session Participants"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Currently Active:"}),e.jsxs("div",{className:"flex -space-x-2",children:[e.jsx(s,{name:"Sarah Chen",src:r.student1,size:"sm",onlineStatus:"online",showStatus:!0,shape:"circle"}),e.jsx(s,{name:"David Kim",src:r.student2,size:"sm",onlineStatus:"online",showStatus:!0,shape:"circle"}),e.jsx(s,{name:"Priya Patel",src:r.student3,size:"sm",onlineStatus:"online",showStatus:!0,shape:"circle"}),e.jsx(s,{name:"Alex Thompson",src:r.ta,size:"sm",isBuilder:!0,onlineStatus:"online",showStatus:!0,shape:"circle"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"Sarah Chen",src:r.student1,size:"md",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Leading session"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"David Kim",src:r.student2,size:"md",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Sharing screen"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"Priya Patel",src:r.student3,size:"md",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Taking notes"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"Alex Thompson",src:r.ta,size:"md",isBuilder:!0,onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Builder mentor"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Navigation & Profile Management:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Navigation Bar Avatar:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"HIVE Platform Navigation"}),e.jsx(s,{name:"Current User",src:r.student1,size:"sm",onlineStatus:"online",showStatus:!0,editable:!0,onEdit:()=>console.log("Profile settings")})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Small avatar in navigation with status indicator and quick profile access"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Editing:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"Profile Photo",src:r.student2,size:"xl",editable:!0,onUpload:i=>console.log("Upload new photo:",i.name),onEdit:()=>console.log("Edit profile")}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Update Profile Photo"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Hover to edit or upload new image. Mobile users get upload button."})]})]})})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"UB Engineering Society - Organization Profile:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Organization Leadership & Members"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"UB Engineering Society",src:r.faculty,size:"lg",isVerified:!0,shape:"rounded"}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-md",weight:"medium",children:"UB Engineering Society"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Official Student Organization • 450 members"}),e.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[e.jsx(x,{className:"w-3 h-3 text-[var(--hive-status-info)]"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Verified Organization"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Leadership Team:"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"President Riley",src:r.student1,size:"md",isBuilder:!0,onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"President"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"VP Technology",src:r.student2,size:"md",isBuilder:!0,onlineStatus:"away",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"VP Tech"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{name:"Events Chair",src:r.student3,size:"md",onlineStatus:"online",showStatus:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Events"})]})]})]})]})})]})})]})]})]})]})},v={args:{name:"Interactive User",src:r.student1,size:"lg",shape:"circle",border:"subtle",onlineStatus:"online",showStatus:!0,isBuilder:!1,isVerified:!1,ghostMode:!1,editable:!0,loading:!1},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(t,{children:[e.jsxs(o,{children:[e.jsx(n,{children:"Profile Avatar Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different profile avatar configurations"})]}),e.jsx(d,{className:"p-6",children:e.jsxs("div",{className:"space-y-4 flex flex-col items-center",children:[e.jsx(s,{...i,onEdit:()=>alert("Edit profile clicked!"),onUpload:w=>alert(`Upload file: ${w.name}`)}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive profile avatar testing for University at Buffalo campus identity display"})]})})]})})};var p,g,y;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: 'Sarah Chen',
    src: sampleAvatars.student1,
    size: 'md',
    shape: 'circle',
    border: 'subtle',
    onlineStatus: 'online',
    showStatus: true,
    isBuilder: false,
    isVerified: false,
    ghostMode: false,
    editable: false,
    loading: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            University at Buffalo student profile avatar:
          </Text>
          <ProfileAvatar {...args} />
          <Text variant="body-sm" color="secondary">
            Standard student avatar with online status for UB campus interaction
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(y=(g=c.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var f,b,N;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📏 SIZES</Badge>
            Profile Avatar Sizes
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 size options for flexible integration across all University at Buffalo interface layouts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-end gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Alex Kim" src={sampleAvatars.student2} size="xs" onlineStatus="online" showStatus />
                    <Text variant="body-xs" color="secondary">XS - Chat lists</Text>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Maria Santos" src={sampleAvatars.student3} size="sm" onlineStatus="away" showStatus />
                    <Text variant="body-xs" color="secondary">SM - Navigation</Text>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Jordan Lee" src={sampleAvatars.student1} size="md" onlineStatus="online" showStatus isVerified />
                    <Text variant="body-xs" color="secondary">MD - Default</Text>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Dr. Rodriguez" src={sampleAvatars.faculty} size="lg" onlineStatus="busy" showStatus isVerified />
                    <Text variant="body-xs" color="secondary">LG - Cards</Text>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Taylor Wilson" src={sampleAvatars.ta} size="xl" onlineStatus="online" showStatus isBuilder />
                    <Text variant="body-xs" color="secondary">XL - Profiles</Text>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <ProfileAvatar name="Riley Chen" src={sampleAvatars.student2} size="xxl" onlineStatus="online" showStatus isBuilder />
                    <Text variant="body-xs" color="secondary">XXL - Headers</Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Shape & Border Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🔳 SHAPES & BORDERS</Badge>
            Avatar Shapes and Border Styles
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 shapes and 5 border styles for different design contexts and user status indication
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Shape Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Circle (Default):</Text>
                  <div className="flex gap-4">
                    <ProfileAvatar name="Sarah Chen" src={sampleAvatars.student1} shape="circle" size="lg" />
                    <ProfileAvatar name="Marcus Johnson" src={sampleAvatars.student2} shape="circle" size="lg" isVerified />
                    <ProfileAvatar name="Emily Rodriguez" src={sampleAvatars.student3} shape="circle" size="lg" isBuilder />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Rounded:</Text>
                  <div className="flex gap-4">
                    <ProfileAvatar name="David Kim" src={sampleAvatars.ta} shape="rounded" size="lg" />
                    <ProfileAvatar name="Priya Patel" src={sampleAvatars.faculty} shape="rounded" size="lg" isVerified />
                    <ProfileAvatar name="Sam Rivera" src={sampleAvatars.student1} shape="rounded" size="lg" isBuilder />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Square:</Text>
                  <div className="flex gap-4">
                    <ProfileAvatar name="Alex Chen" src={sampleAvatars.student2} shape="square" size="lg" />
                    <ProfileAvatar name="Jordan Taylor" src={sampleAvatars.student3} shape="square" size="lg" isVerified />
                    <ProfileAvatar name="Casey Williams" src={sampleAvatars.ta} shape="square" size="lg" isBuilder />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Border Styles:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Border Types:</Text>
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="No Border" src={sampleAvatars.student1} border="none" size="lg" />
                      <Text variant="body-xs" color="secondary">None</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Subtle Border" src={sampleAvatars.student2} border="subtle" size="lg" />
                      <Text variant="body-xs" color="secondary">Subtle</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Primary Border" src={sampleAvatars.student3} border="primary" size="lg" />
                      <Text variant="body-xs" color="secondary">Primary</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Builder Border" src={sampleAvatars.ta} border="builder" size="lg" />
                      <Text variant="body-xs" color="secondary">Builder</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Verified Border" src={sampleAvatars.faculty} border="verified" size="lg" />
                      <Text variant="body-xs" color="secondary">Verified</Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Status & Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🏆 STATUS & BADGES</Badge>
            Online Status and User Recognition Badges
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive status system for University at Buffalo campus presence and user recognition
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Online Status Indicators:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Presence Status:</Text>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Online Student" src={sampleAvatars.student1} size="lg" onlineStatus="online" showStatus />
                      <Text variant="body-xs" color="secondary">Online</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Away Student" src={sampleAvatars.student2} size="lg" onlineStatus="away" showStatus />
                      <Text variant="body-xs" color="secondary">Away</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Busy Student" src={sampleAvatars.student3} size="lg" onlineStatus="busy" showStatus />
                      <Text variant="body-xs" color="secondary">Busy</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Offline Student" src={sampleAvatars.ta} size="lg" onlineStatus="offline" showStatus />
                      <Text variant="body-xs" color="secondary">Offline</Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Usage Context:</Text>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" weight="medium" className="mb-1">Online - Available for study groups</Text>
                      <Text variant="body-xs" color="secondary">Student actively using HIVE, available for collaboration</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" weight="medium" className="mb-1">Away - Between classes</Text>
                      <Text variant="body-xs" color="secondary">Moving around campus, may respond with delay</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" weight="medium" className="mb-1">Busy - In class/studying</Text>
                      <Text variant="body-xs" color="secondary">Focus mode, prefer not to be disturbed</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" weight="medium" className="mb-1">Offline - Not on campus</Text>
                      <Text variant="body-xs" color="secondary">Away from campus or not using platform</Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Recognition Badges:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">User Types:</Text>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Platform Builder" src={sampleAvatars.ta} size="lg" isBuilder onlineStatus="online" showStatus />
                      <div className="flex items-center gap-1">
                        <Crown className="w-3 h-3 text-[var(--hive-brand-gold)]" />
                        <Text variant="body-xs" color="secondary">Builder</Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Verified Faculty" src={sampleAvatars.faculty} size="lg" isVerified onlineStatus="away" showStatus />
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[var(--hive-status-info)]" />
                        <Text variant="body-xs" color="secondary">Verified</Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Ghost Mode" src={sampleAvatars.student1} size="lg" ghostMode onlineStatus="online" showStatus />
                      <div className="flex items-center gap-1">
                        <EyeOff className="w-3 h-3 text-[var(--hive-text-muted)]" />
                        <Text variant="body-xs" color="secondary">Ghost</Text>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Badge Meanings:</Text>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-[var(--hive-brand-gold)]" />
                        <Text variant="body-sm" weight="medium">Builder</Text>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        HIVE platform contributor who creates tools and enhances campus community
                      </Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-[var(--hive-status-info)]" />
                        <Text variant="body-sm" weight="medium">Verified</Text>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Confirmed University at Buffalo faculty, staff, or official organization
                      </Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <EyeOff className="w-4 h-4 text-[var(--hive-text-muted)]" />
                        <Text variant="body-sm" weight="medium">Ghost Mode</Text>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Student using privacy mode with limited profile visibility
                      </Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Fallback & States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔄 FALLBACKS & STATES</Badge>
            Avatar Fallbacks and Interactive States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Graceful degradation system and interactive states for avatar management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Fallback System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Image → Initials → Placeholder:</Text>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Sarah Chen" src={sampleAvatars.student1} size="lg" isVerified />
                      <Text variant="body-xs" color="secondary">With Image</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Marcus Johnson" size="lg" isBuilder />
                      <Text variant="body-xs" color="secondary">Initials (MJ)</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Loading User" size="lg" loading />
                      <Text variant="body-xs" color="secondary">Loading</Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Different Name Lengths:</Text>
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="John" size="md" />
                      <Text variant="body-xs" color="secondary">J</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Maria Santos" size="md" />
                      <Text variant="body-xs" color="secondary">MS</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Alexander Christopher Johnson" size="md" />
                      <Text variant="body-xs" color="secondary">AC</Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Editable Avatars:</Text>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Editable Profile" src={sampleAvatars.student2} size="lg" editable onEdit={() => console.log('Edit clicked')} />
                      <Text variant="body-xs" color="secondary">Hover to Edit</Text>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ProfileAvatar name="Upload Photo" size="lg" editable onUpload={file => console.log('Upload:', file.name)} />
                      <Text variant="body-xs" color="secondary">Upload Enabled</Text>
                    </div>
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
            Real Campus Avatar Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile avatar usage in actual University at Buffalo academic and social contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Space Avatars */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 - Algorithm Analysis Course Space:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Course Participants
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Instructor & TAs:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3">
                        <ProfileAvatar name="Dr. Emily Rodriguez" src={sampleAvatars.faculty} size="md" isVerified onlineStatus="away" showStatus />
                        <div>
                          <Text variant="body-sm" weight="medium">Dr. Emily Rodriguez</Text>
                          <Text variant="body-xs" color="secondary">Professor • Office Hours: Tue/Thu 2-4pm</Text>
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3">
                        <ProfileAvatar name="Alex Kim" src={sampleAvatars.ta} size="md" isVerified onlineStatus="online" showStatus />
                        <div>
                          <Text variant="body-sm" weight="medium">Alex Kim</Text>
                          <Text variant="body-xs" color="secondary">Teaching Assistant • Lab Wed 6-8pm</Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Students:</Text>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3">
                        <ProfileAvatar name="Sarah Chen" src={sampleAvatars.student1} size="md" onlineStatus="online" showStatus />
                        <div>
                          <Text variant="body-sm" weight="medium">Sarah Chen</Text>
                          <Text variant="body-xs" color="secondary">Computer Science • Study Group Leader</Text>
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3">
                        <ProfileAvatar name="Marcus Johnson" src={sampleAvatars.student2} size="md" onlineStatus="busy" showStatus />
                        <div>
                          <Text variant="body-sm" weight="medium">Marcus Johnson</Text>
                          <Text variant="body-xs" color="secondary">Math/CS Double Major • In Study Session</Text>
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] flex items-center gap-3">
                        <ProfileAvatar name="Jordan Lee" size="md" ghostMode onlineStatus="away" showStatus />
                        <div>
                          <Text variant="body-sm" weight="medium">Jordan Lee</Text>
                          <Text variant="body-xs" color="secondary">Computer Engineering • Privacy Mode</Text>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Study Group Avatars */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Algorithm Study Group - Active Session:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Live Study Session Participants
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                  <div className="flex items-center gap-4 mb-4">
                    <Text variant="body-sm" weight="medium">Currently Active:</Text>
                    <div className="flex -space-x-2">
                      <ProfileAvatar name="Sarah Chen" src={sampleAvatars.student1} size="sm" onlineStatus="online" showStatus shape="circle" />
                      <ProfileAvatar name="David Kim" src={sampleAvatars.student2} size="sm" onlineStatus="online" showStatus shape="circle" />
                      <ProfileAvatar name="Priya Patel" src={sampleAvatars.student3} size="sm" onlineStatus="online" showStatus shape="circle" />
                      <ProfileAvatar name="Alex Thompson" src={sampleAvatars.ta} size="sm" isBuilder onlineStatus="online" showStatus shape="circle" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center">
                      <ProfileAvatar name="Sarah Chen" src={sampleAvatars.student1} size="md" onlineStatus="online" showStatus />
                      <Text variant="body-xs" color="secondary" className="mt-1">Leading session</Text>
                    </div>
                    <div className="text-center">
                      <ProfileAvatar name="David Kim" src={sampleAvatars.student2} size="md" onlineStatus="online" showStatus />
                      <Text variant="body-xs" color="secondary" className="mt-1">Sharing screen</Text>
                    </div>
                    <div className="text-center">
                      <ProfileAvatar name="Priya Patel" src={sampleAvatars.student3} size="md" onlineStatus="online" showStatus />
                      <Text variant="body-xs" color="secondary" className="mt-1">Taking notes</Text>
                    </div>
                    <div className="text-center">
                      <ProfileAvatar name="Alex Thompson" src={sampleAvatars.ta} size="md" isBuilder onlineStatus="online" showStatus />
                      <Text variant="body-xs" color="secondary" className="mt-1">Builder mentor</Text>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Navigation & Profile Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Navigation Bar Avatar:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="flex items-center justify-between">
                      <Text variant="body-sm" weight="medium">HIVE Platform Navigation</Text>
                      <ProfileAvatar name="Current User" src={sampleAvatars.student1} size="sm" onlineStatus="online" showStatus editable onEdit={() => console.log('Profile settings')} />
                    </div>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Small avatar in navigation with status indicator and quick profile access
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Editing:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="flex items-center gap-4">
                      <ProfileAvatar name="Profile Photo" src={sampleAvatars.student2} size="xl" editable onUpload={file => console.log('Upload new photo:', file.name)} onEdit={() => console.log('Edit profile')} />
                      <div>
                        <Text variant="body-sm" weight="medium">Update Profile Photo</Text>
                        <Text variant="body-xs" color="secondary">
                          Hover to edit or upload new image. Mobile users get upload button.
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Campus Organizations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">UB Engineering Society - Organization Profile:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Organization Leadership & Members
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <ProfileAvatar name="UB Engineering Society" src={sampleAvatars.faculty} size="lg" isVerified shape="rounded" />
                      <div>
                        <Text variant="body-md" weight="medium">UB Engineering Society</Text>
                        <Text variant="body-sm" color="secondary">Official Student Organization • 450 members</Text>
                        <div className="flex items-center gap-2 mt-1">
                          <Shield className="w-3 h-3 text-[var(--hive-status-info)]" />
                          <Text variant="body-xs" color="secondary">Verified Organization</Text>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Text variant="body-sm" color="gold" weight="medium">Leadership Team:</Text>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <ProfileAvatar name="President Riley" src={sampleAvatars.student1} size="md" isBuilder onlineStatus="online" showStatus />
                          <Text variant="body-xs" color="secondary" className="mt-1">President</Text>
                        </div>
                        <div className="text-center">
                          <ProfileAvatar name="VP Technology" src={sampleAvatars.student2} size="md" isBuilder onlineStatus="away" showStatus />
                          <Text variant="body-xs" color="secondary" className="mt-1">VP Tech</Text>
                        </div>
                        <div className="text-center">
                          <ProfileAvatar name="Events Chair" src={sampleAvatars.student3} size="md" onlineStatus="online" showStatus />
                          <Text variant="body-xs" color="secondary" className="mt-1">Events</Text>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(N=(b=m.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var j,S,T;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    name: 'Interactive User',
    src: sampleAvatars.student1,
    size: 'lg',
    shape: 'circle',
    border: 'subtle',
    onlineStatus: 'online',
    showStatus: true,
    isBuilder: false,
    isVerified: false,
    ghostMode: false,
    editable: true,
    loading: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Avatar Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different profile avatar configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 flex flex-col items-center">
            <ProfileAvatar {...args} onEdit={() => alert('Edit profile clicked!')} onUpload={file => alert(\`Upload file: \${file.name}\`)} />
            <Text variant="body-sm" color="secondary">
              Interactive profile avatar testing for University at Buffalo campus identity display
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(T=(S=v.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const F=["Default","CompleteShowcase","Playground"];export{m as CompleteShowcase,c as Default,v as Playground,F as __namedExportsOrder,J as default};
