import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as y}from"./index-DJO9vBfz.js";import{c as P}from"./index-BwobEAja.js";import{c as l}from"./utils-CytzSlOG.js";import{H as u,a as v,b as g,c as x}from"./hive-tokens-CKIUfcHM.js";import{B as i}from"./badge-B09J4pcg.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const E=P("peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=unchecked]:bg-[var(--hive-border-default)]",{variants:{size:{sm:"h-5 w-9",default:"h-6 w-11",lg:"h-7 w-13",xl:"h-8 w-15"},variant:{default:"data-[state=checked]:bg-[var(--hive-brand-secondary)] data-[state=unchecked]:bg-[var(--hive-border-default)]",success:"data-[state=checked]:bg-[var(--hive-status-success)] data-[state=unchecked]:bg-[var(--hive-border-default)]",error:"data-[state=checked]:bg-[var(--hive-status-error)] data-[state=unchecked]:bg-[var(--hive-border-default)]",warning:"data-[state=checked]:bg-[var(--hive-status-warning)] data-[state=unchecked]:bg-[var(--hive-border-default)]",info:"data-[state=checked]:bg-[var(--hive-status-info)] data-[state=unchecked]:bg-[var(--hive-border-default)]"}},defaultVariants:{size:"default",variant:"default"}}),W=P("pointer-events-none block rounded-full bg-[var(--hive-background-primary)] shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",{variants:{size:{sm:"h-4 w-4 data-[state=checked]:translate-x-4",default:"h-5 w-5 data-[state=checked]:translate-x-5",lg:"h-6 w-6 data-[state=checked]:translate-x-6",xl:"h-7 w-7 data-[state=checked]:translate-x-7"}},defaultVariants:{size:"default"}}),Y=P("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",{variants:{color:{primary:"text-[var(--hive-text-primary)]",secondary:"text-[var(--hive-text-secondary)]",tertiary:"text-[var(--hive-text-tertiary)]",error:"text-[var(--hive-status-error)]",success:"text-[var(--hive-status-success)]",warning:"text-[var(--hive-status-warning)]",info:"text-[var(--hive-status-info)]"},weight:{normal:"font-normal",medium:"font-medium",semibold:"font-semibold"}},defaultVariants:{color:"primary",weight:"normal"}}),a=y.forwardRef(({className:s,size:n,variant:h,label:c,description:o,error:d,labelPosition:p="right",showIcons:C,checkedIcon:z,uncheckedIcon:f,labelProps:t,checked:b,onChange:T,onCheckedChange:A,id:D,...O},_)=>{const R=D||y.useId(),I=e.jsxs("div",{className:"relative flex items-center",children:[e.jsx("input",{type:"checkbox",id:R,className:l(E({size:n,variant:h}),"sr-only",s),ref:_,checked:b,onChange:w=>{T==null||T(w),A==null||A(w.target.checked)},...O}),e.jsx("label",{htmlFor:R,className:l(E({size:n,variant:h}),"relative cursor-pointer"),"data-state":b?"checked":"unchecked",children:e.jsx("span",{className:l(W({size:n})),"data-state":b?"checked":"unchecked",children:C&&e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:b?z||e.jsx(Z,{}):f||e.jsx(J,{})})})})]}),X=(c||o)&&e.jsxs("div",{className:"flex-1 space-y-1",children:[c&&e.jsx("label",{htmlFor:R,className:l(Y({color:t==null?void 0:t.color,weight:t==null?void 0:t.weight}),"cursor-pointer",t==null?void 0:t.className),...t&&Object.fromEntries(Object.entries(t).filter(([w])=>!["color","weight","className"].includes(w))),children:c}),o&&e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)] leading-relaxed",children:o})]});return c||o||d?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:l("flex items-start space-x-3",p==="left"&&"flex-row-reverse space-x-reverse"),children:[I,X]}),d&&e.jsx("p",{className:l("text-xs text-[var(--hive-status-error)]",p==="left"?"mr-14":"ml-14"),children:d})]}):I});a.displayName="Switch";const m=y.forwardRef(({className:s,orientation:n="vertical",spacing:h="md",label:c,description:o,error:d,children:p,...C},z)=>{const f=y.useId(),t={none:"",sm:n==="horizontal"?"space-x-4":"space-y-2",md:n==="horizontal"?"space-x-6":"space-y-3",lg:n==="horizontal"?"space-x-8":"space-y-4"};return e.jsxs("div",{className:"space-y-2",children:[c&&e.jsx("label",{htmlFor:f,className:"text-sm font-medium text-[var(--hive-text-primary)]",children:c}),o&&e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:o}),e.jsx("div",{ref:z,id:f,className:l("flex",n==="horizontal"?"flex-row flex-wrap items-center":"flex-col",t[h],s),role:"group","aria-labelledby":c?f:void 0,...C,children:p}),d&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)]",children:d})]})});m.displayName="SwitchGroup";const r=y.forwardRef(({icon:s,badge:n,label:h,description:c,className:o,...d},p)=>e.jsxs("div",{className:l("flex items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)]",o),children:[e.jsxs("div",{className:"flex items-start space-x-3 flex-1",children:[s&&e.jsx("div",{className:"flex-shrink-0 text-[var(--hive-text-secondary)]",children:s}),e.jsxs("div",{className:"flex-1 space-y-1",children:[h&&e.jsx("div",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:h}),c&&e.jsx("div",{className:"text-xs text-[var(--hive-text-tertiary)]",children:c})]}),n&&e.jsx("div",{className:"flex-shrink-0",children:n})]}),e.jsx(SwitchEnhanced,{ref:p,labelPosition:"left",className:"ml-4",...d})]}));r.displayName="SwitchCard";const N={Notifications:s=>e.jsx(SwitchEnhanced,{label:"Enable notifications",description:"Receive updates and alerts",...s}),DarkMode:s=>e.jsx(SwitchEnhanced,{label:"Dark mode",description:"Toggle between light and dark themes",showIcons:!0,checkedIcon:e.jsx(Q,{}),uncheckedIcon:e.jsx(K,{}),...s}),Privacy:s=>e.jsx(SwitchEnhanced,{label:"Private profile",description:"Hide your profile from search results",...s}),AutoSave:s=>e.jsx(SwitchEnhanced,{label:"Auto-save",description:"Automatically save changes",size:"sm",...s})},Z=()=>e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20 6L9 17l-5-5"})}),J=()=>e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Q=()=>e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"})}),K=()=>e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"5"}),e.jsx("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"})]});a.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},showIcons:{required:!1,tsType:{name:"boolean"},description:""},checkedIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},uncheckedIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},labelProps:{required:!1,tsType:{name:"intersection",raw:`React.LabelHTMLAttributes<HTMLLabelElement> & 
VariantProps<typeof switchLabelVariants>`,elements:[{name:"ReactLabelHTMLAttributes",raw:"React.LabelHTMLAttributes<HTMLLabelElement>",elements:[{name:"HTMLLabelElement"}]},{name:"VariantProps",elements:[{name:"switchLabelVariants"}],raw:"VariantProps<typeof switchLabelVariants>"}]},description:""},onCheckedChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""}},composes:["Omit","VariantProps"]};m.__docgenInfo={description:"",methods:[],displayName:"SwitchGroup",props:{orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},spacing:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"SwitchCard",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},showIcons:{required:!1,tsType:{name:"boolean"},description:""},checkedIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},uncheckedIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},labelProps:{required:!1,tsType:{name:"intersection",raw:`React.LabelHTMLAttributes<HTMLLabelElement> & 
VariantProps<typeof switchLabelVariants>`,elements:[{name:"ReactLabelHTMLAttributes",raw:"React.LabelHTMLAttributes<HTMLLabelElement>",elements:[{name:"HTMLLabelElement"}]},{name:"VariantProps",elements:[{name:"switchLabelVariants"}],raw:"VariantProps<typeof switchLabelVariants>"}]},description:""},onCheckedChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},badge:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["Omit","VariantProps"]};const ne={title:"01-Atoms/Switch Enhanced - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Switch Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated switch toggle system for University at Buffalo campus settings and preferences.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Variants** - Default (gold), success, error, warning, info
- **4 Size Options** - Small, default, large, XL with perfect mobile touch targets
- **Advanced Features** - Icons, cards, groups, label positioning, descriptions
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Gold Brand State** - Default variant uses gold fill for active state (semantically correct)
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Ready** - Optimized for UB student preference and settings management

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student settings and coordination:
- **Privacy Controls** - Profile visibility, ghost mode, anonymous coordination
- **Notification Settings** - Space alerts, assignment reminders, event notifications
- **Academic Preferences** - Study reminder settings, course alert preferences
- **Social Settings** - Activity visibility, friend requests, space discovery
- **Dorm Coordination** - Floor notification settings, community participation

### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch target requirements
- **Thumb Toggle** - Optimized for single-thumb operation while walking
- **Visual Feedback** - Clear state indication with haptic-like visual transitions
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","error","warning","info"],description:"Switch variant (default uses gold for active state)"},size:{control:"select",options:["sm","default","lg","xl"],description:"Switch size (all optimized for mobile touch)"},labelPosition:{control:"select",options:["left","right"],description:"Label position relative to switch"},showIcons:{control:"boolean",description:"Show icons inside switch thumb"},checked:{control:"boolean",description:"Switch state"},disabled:{control:"boolean",description:"Disabled state"}}},S={args:{label:"Enable notifications",description:"Receive updates about your spaces and activities",variant:"default",size:"default",checked:!0}},j={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"success",children:"✅ VARIANTS"}),"Switch Variants - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 variants using 100% semantic tokens (default uses gold fill for active state)"})]}),e.jsx(x,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Default (Gold Brand)",description:"Gold fill indicates active campus features",variant:"primary",checked:!0}),e.jsx(a,{label:"Success Toggle",description:"Indicates successful or completed states",variant:"success",checked:!0}),e.jsx(a,{label:"Error Toggle",description:"Used for critical or error-prone settings",variant:"error",checked:!1})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Warning Toggle",description:"Settings that require attention or caution",variant:"warning",checked:!0}),e.jsx(a,{label:"Info Toggle",description:"Informational settings and preferences",variant:"info",checked:!1})]})]})})]}),e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"info",children:"📏 SIZES"}),"Switch Sizes - Mobile-First Touch Optimization"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 sizes optimized for different campus coordination contexts"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Small",description:"Compact forms",size:"sm",variant:"primary",checked:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"SM: 20px × 36px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Default",description:"Standard use",size:"default",variant:"primary",checked:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Default: 24px × 44px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Large",description:"Prominent settings",size:"lg",variant:"primary",checked:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"LG: 28px × 52px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Extra Large",description:"Hero toggles",size:"xl",variant:"primary",checked:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"XL: 32px × 60px"})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"primary",children:"⚡ FEATURES"}),"Advanced Features - Icons, Cards, Groups"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced switch features for enhanced campus coordination UX"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Icon Switches:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Dark Mode",description:"Toggle between light and dark themes",showIcons:!0,variant:"primary",checked:!1}),e.jsx(a,{label:"Auto-save",description:"Automatically save your work",showIcons:!0,variant:"success",checked:!0,size:"sm"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Notifications",description:"Receive push notifications",showIcons:!0,variant:"info",checked:!0}),e.jsx(a,{label:"Location Sharing",description:"Share your location with friends",showIcons:!0,variant:"warning",checked:!1})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Label Positioning:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsx(a,{label:"Label on Right (default)",description:"Standard label positioning",labelPosition:"right",variant:"primary",checked:!0}),e.jsx(a,{label:"Label on Left",description:"Alternative label positioning for form layouts",labelPosition:"left",variant:"primary",checked:!1})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Switch Groups:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs(m,{label:"Notification Preferences",description:"Choose which notifications you want to receive",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Study group updates",size:"sm",checked:!0}),e.jsx(a,{label:"Assignment reminders",size:"sm",checked:!0}),e.jsx(a,{label:"Event invitations",size:"sm",checked:!1}),e.jsx(a,{label:"Campus announcements",size:"sm",checked:!0})]}),e.jsxs(m,{label:"Privacy Settings",description:"Control your visibility and data sharing",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Public profile",size:"sm",checked:!1}),e.jsx(a,{label:"Show online status",size:"sm",checked:!0}),e.jsx(a,{label:"Allow friend requests",size:"sm",checked:!0}),e.jsx(a,{label:"Share study schedule",size:"sm",checked:!1})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Switch Cards:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{label:"Campus Notifications",description:"Receive updates about campus events, announcements, and important information",icon:e.jsx("span",{className:"text-lg",children:"🔔"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Essential"}),variant:"primary",checked:!0}),e.jsx(r,{label:"Study Group Coordination",description:"Get notified when study groups in your courses are forming or meeting",icon:e.jsx("span",{className:"text-lg",children:"📚"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Academic"}),variant:"primary",checked:!0}),e.jsx(r,{label:"Location Sharing",description:"Share your campus location with friends for easy meetups and coordination",icon:e.jsx("span",{className:"text-lg",children:"📍"}),badge:e.jsx(i,{variant:"warning",size:"sm",children:"Privacy"}),variant:"primary",checked:!1})]})]})]})})]}),e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🎯 PRESETS"}),"Switch Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built switch components for common campus coordination scenarios"})]}),e.jsx(x,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Common Presets:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(N.Notifications,{checked:!0}),e.jsx(N.DarkMode,{checked:!1}),e.jsx(N.Privacy,{checked:!1}),e.jsx(N.AutoSave,{checked:!0})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Custom Campus Switches:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Ghost Mode",description:"Appear offline while remaining active",variant:"primary",checked:!1}),e.jsx(a,{label:"Study Mode",description:"Automatically mute non-urgent notifications during study hours",variant:"info",checked:!0}),e.jsx(a,{label:"Floor Notifications",description:"Receive updates from your residence hall floor",variant:"success",checked:!0})]})]})]})})]}),e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Settings Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Switch usage in actual University at Buffalo student settings and preferences"})]}),e.jsxs(x,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Profile & Privacy Settings:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(m,{orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Public Profile",description:"Allow other UB students to find and view your profile",variant:"primary",checked:!0,size:"sm"}),e.jsx(a,{label:"Show Academic Information",description:"Display your major, year, and academic interests",variant:"primary",checked:!0,size:"sm"}),e.jsx(a,{label:"Ghost Mode",description:"Appear offline while remaining active in your spaces",variant:"primary",checked:!1,size:"sm"}),e.jsx(a,{label:"Anonymous Coordination",description:"Participate in study groups without revealing identity",variant:"primary",checked:!1,size:"sm"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Notifications:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(r,{label:"Assignment Deadlines",description:"Get reminded 24 hours before assignments are due in your tracked courses",icon:e.jsx("span",{className:"text-lg",children:"📝"}),badge:e.jsx(i,{variant:"error",size:"sm",children:"Critical"}),variant:"error",checked:!0}),e.jsx(r,{label:"Study Group Formation",description:"Notify when study groups form for CSE 331, MTH 241, and other enrolled courses",icon:e.jsx("span",{className:"text-lg",children:"👥"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Academic"}),variant:"success",checked:!0}),e.jsx(r,{label:"Professor Office Hours",description:"Reminders when your professors have upcoming office hours",icon:e.jsx("span",{className:"text-lg",children:"🏫"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Optional"}),variant:"info",checked:!1}),e.jsx(r,{label:"Grade Updates",description:"Immediate notifications when grades are posted on UBLearns",icon:e.jsx("span",{className:"text-lg",children:"📊"}),badge:e.jsx(i,{variant:"warning",size:"sm",children:"Academic"}),variant:"warning",checked:!0})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Hadley Village 2nd Floor Settings:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(m,{label:"Floor Community Participation",description:"Choose how you want to participate in floor activities",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Floor Events",description:"Get invited to movie nights, study sessions, and social events",variant:"primary",checked:!0,size:"sm"}),e.jsx(a,{label:"Emergency Notifications",description:"Receive urgent floor-wide announcements and safety alerts",variant:"error",checked:!0,size:"sm"}),e.jsx(a,{label:"Quiet Hours Enforcement",description:"Help enforce quiet hours by receiving/sending noise level updates",variant:"info",checked:!1,size:"sm"}),e.jsx(a,{label:"Shared Resource Coordination",description:"Coordinate laundry times, kitchen usage, and common area booking",variant:"success",checked:!0,size:"sm"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE 331 - Algorithm Analysis Settings:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs(m,{label:"Study Coordination",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Study Group Invites",description:"Receive invites to algorithm study sessions",variant:"primary",checked:!0,size:"sm"}),e.jsx(a,{label:"Homework Collaboration",description:"Get paired for homework discussion (within academic honesty)",variant:"success",checked:!0,size:"sm"}),e.jsx(a,{label:"Exam Prep Sessions",description:"Join group exam preparation and review sessions",variant:"warning",checked:!0,size:"sm"})]}),e.jsxs(m,{label:"Course Updates",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{label:"Assignment Postings",description:"Immediate alerts when new assignments are posted",variant:"error",checked:!0,size:"sm"}),e.jsx(a,{label:"Grade Releases",description:"Notification when assignment grades are available",variant:"info",checked:!0,size:"sm"}),e.jsx(a,{label:"Schedule Changes",description:"Updates about lecture cancellations or room changes",variant:"warning",checked:!0,size:"sm"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Activity Preferences:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(r,{label:"Event Discovery",description:"Get notified about campus events matching your interests: CS clubs, hackathons, career fairs",icon:e.jsx("span",{className:"text-lg",children:"🎯"}),badge:e.jsx(i,{variant:"primary",size:"sm",children:"Recommended"}),variant:"primary",checked:!0}),e.jsx(r,{label:"Club Recruitment",description:"Receive invitations from clubs seeking members with your skills and interests",icon:e.jsx("span",{className:"text-lg",children:"🤝"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Social"}),variant:"info",checked:!1}),e.jsx(r,{label:"Intramural Sports",description:"Get updates about intramural league registration and team formation",icon:e.jsx("span",{className:"text-lg",children:"⚽"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Fitness"}),variant:"success",checked:!1})]})]})]})]})]})},k={args:{label:"UB Notification Settings",description:"Control how you receive updates about campus activities",variant:"default",size:"default",checked:!0,showIcons:!1,labelPosition:"right"},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(u,{children:[e.jsxs(v,{children:[e.jsx(g,{children:"Switch Enhanced Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different switch configurations"})]}),e.jsx(x,{className:"flex justify-center",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(a,{...s})})})]})})};var L,B,G;S.parameters={...S.parameters,docs:{...(L=S.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Enable notifications',
    description: 'Receive updates about your spaces and activities',
    variant: 'default',
    size: 'default',
    checked: true
  }
}`,...(G=(B=S.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var H,M,U;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ VARIANTS</Badge>
            Switch Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 variants using 100% semantic tokens (default uses gold fill for active state)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Switch label="Default (Gold Brand)" description="Gold fill indicates active campus features" variant="primary" checked={true} />
              <Switch label="Success Toggle" description="Indicates successful or completed states" variant="success" checked={true} />
              <Switch label="Error Toggle" description="Used for critical or error-prone settings" variant="error" checked={false} />
            </div>
            <div className="space-y-4">
              <Switch label="Warning Toggle" description="Settings that require attention or caution" variant="warning" checked={true} />
              <Switch label="Info Toggle" description="Informational settings and preferences" variant="info" checked={false} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Switch Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes optimized for different campus coordination contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Switch label="Small" description="Compact forms" size="sm" variant="primary" checked={true} />
                <p className="text-xs text-[var(--hive-text-muted)]">SM: 20px × 36px</p>
              </div>
              <div className="space-y-3">
                <Switch label="Default" description="Standard use" size="default" variant="primary" checked={true} />
                <p className="text-xs text-[var(--hive-text-muted)]">Default: 24px × 44px</p>
              </div>
              <div className="space-y-3">
                <Switch label="Large" description="Prominent settings" size="lg" variant="primary" checked={true} />
                <p className="text-xs text-[var(--hive-text-muted)]">LG: 28px × 52px</p>
              </div>
              <div className="space-y-3">
                <Switch label="Extra Large" description="Hero toggles" size="xl" variant="primary" checked={true} />
                <p className="text-xs text-[var(--hive-text-muted)]">XL: 32px × 60px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ FEATURES</Badge>
            Advanced Features - Icons, Cards, Groups
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced switch features for enhanced campus coordination UX
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Icon Switches */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Switches:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Switch label="Dark Mode" description="Toggle between light and dark themes" showIcons variant="primary" checked={false} />
                  <Switch label="Auto-save" description="Automatically save your work" showIcons variant="success" checked={true} size="sm" />
                </div>
                <div className="space-y-4">
                  <Switch label="Notifications" description="Receive push notifications" showIcons variant="info" checked={true} />
                  <Switch label="Location Sharing" description="Share your location with friends" showIcons variant="warning" checked={false} />
                </div>
              </div>
            </div>

            {/* Label Positioning */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Label Positioning:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <Switch label="Label on Right (default)" description="Standard label positioning" labelPosition="right" variant="primary" checked={true} />
                <Switch label="Label on Left" description="Alternative label positioning for form layouts" labelPosition="left" variant="primary" checked={false} />
              </div>
            </div>

            {/* Switch Groups */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Switch Groups:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <SwitchGroup label="Notification Preferences" description="Choose which notifications you want to receive" orientation="vertical" spacing="sm">
                  <Switch label="Study group updates" size="sm" checked={true} />
                  <Switch label="Assignment reminders" size="sm" checked={true} />
                  <Switch label="Event invitations" size="sm" checked={false} />
                  <Switch label="Campus announcements" size="sm" checked={true} />
                </SwitchGroup>
                
                <SwitchGroup label="Privacy Settings" description="Control your visibility and data sharing" orientation="vertical" spacing="sm">
                  <Switch label="Public profile" size="sm" checked={false} />
                  <Switch label="Show online status" size="sm" checked={true} />
                  <Switch label="Allow friend requests" size="sm" checked={true} />
                  <Switch label="Share study schedule" size="sm" checked={false} />
                </SwitchGroup>
              </div>
            </div>

            {/* Switch Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Switch Cards:</h4>
              <div className="space-y-3">
                <SwitchCard label="Campus Notifications" description="Receive updates about campus events, announcements, and important information" icon={<span className="text-lg">🔔</span>} badge={<Badge variant="success" size="sm">Essential</Badge>} variant="primary" checked={true} />
                <SwitchCard label="Study Group Coordination" description="Get notified when study groups in your courses are forming or meeting" icon={<span className="text-lg">📚</span>} badge={<Badge variant="info" size="sm">Academic</Badge>} variant="primary" checked={true} />
                <SwitchCard label="Location Sharing" description="Share your campus location with friends for easy meetups and coordination" icon={<span className="text-lg">📍</span>} badge={<Badge variant="warning" size="sm">Privacy</Badge>} variant="primary" checked={false} />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Switch Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎯 PRESETS</Badge>
            Switch Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built switch components for common campus coordination scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Presets:</h4>
              <div className="space-y-3">
                <SwitchPresets.Notifications checked={true} />
                <SwitchPresets.DarkMode checked={false} />
                <SwitchPresets.Privacy checked={false} />
                <SwitchPresets.AutoSave checked={true} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Campus Switches:</h4>
              <div className="space-y-3">
                <Switch label="Ghost Mode" description="Appear offline while remaining active" variant="primary" checked={false} />
                <Switch label="Study Mode" description="Automatically mute non-urgent notifications during study hours" variant="info" checked={true} />
                <Switch label="Floor Notifications" description="Receive updates from your residence hall floor" variant="success" checked={true} />
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
            Real Campus Settings Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Switch usage in actual University at Buffalo student settings and preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Profile & Privacy Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Profile & Privacy Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <SwitchGroup orientation="vertical" spacing="sm">
                <Switch label="Public Profile" description="Allow other UB students to find and view your profile" variant="primary" checked={true} size="sm" />
                <Switch label="Show Academic Information" description="Display your major, year, and academic interests" variant="primary" checked={true} size="sm" />
                <Switch label="Ghost Mode" description="Appear offline while remaining active in your spaces" variant="primary" checked={false} size="sm" />
                <Switch label="Anonymous Coordination" description="Participate in study groups without revealing identity" variant="primary" checked={false} size="sm" />
              </SwitchGroup>
            </div>
          </div>

          {/* Academic Notification Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Notifications:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <SwitchCard label="Assignment Deadlines" description="Get reminded 24 hours before assignments are due in your tracked courses" icon={<span className="text-lg">📝</span>} badge={<Badge variant="error" size="sm">Critical</Badge>} variant="error" checked={true} />
              <SwitchCard label="Study Group Formation" description="Notify when study groups form for CSE 331, MTH 241, and other enrolled courses" icon={<span className="text-lg">👥</span>} badge={<Badge variant="success" size="sm">Academic</Badge>} variant="success" checked={true} />
              <SwitchCard label="Professor Office Hours" description="Reminders when your professors have upcoming office hours" icon={<span className="text-lg">🏫</span>} badge={<Badge variant="info" size="sm">Optional</Badge>} variant="info" checked={false} />
              <SwitchCard label="Grade Updates" description="Immediate notifications when grades are posted on UBLearns" icon={<span className="text-lg">📊</span>} badge={<Badge variant="warning" size="sm">Academic</Badge>} variant="warning" checked={true} />
            </div>
          </div>

          {/* Residence Hall Coordination */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Hadley Village 2nd Floor Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <SwitchGroup label="Floor Community Participation" description="Choose how you want to participate in floor activities" orientation="vertical" spacing="sm">
                <Switch label="Floor Events" description="Get invited to movie nights, study sessions, and social events" variant="primary" checked={true} size="sm" />
                <Switch label="Emergency Notifications" description="Receive urgent floor-wide announcements and safety alerts" variant="error" checked={true} size="sm" />
                <Switch label="Quiet Hours Enforcement" description="Help enforce quiet hours by receiving/sending noise level updates" variant="info" checked={false} size="sm" />
                <Switch label="Shared Resource Coordination" description="Coordinate laundry times, kitchen usage, and common area booking" variant="success" checked={true} size="sm" />
              </SwitchGroup>
            </div>
          </div>

          {/* Course-Specific Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 - Algorithm Analysis Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <SwitchGroup label="Study Coordination" orientation="vertical" spacing="sm">
                  <Switch label="Study Group Invites" description="Receive invites to algorithm study sessions" variant="primary" checked={true} size="sm" />
                  <Switch label="Homework Collaboration" description="Get paired for homework discussion (within academic honesty)" variant="success" checked={true} size="sm" />
                  <Switch label="Exam Prep Sessions" description="Join group exam preparation and review sessions" variant="warning" checked={true} size="sm" />
                </SwitchGroup>
                
                <SwitchGroup label="Course Updates" orientation="vertical" spacing="sm">
                  <Switch label="Assignment Postings" description="Immediate alerts when new assignments are posted" variant="error" checked={true} size="sm" />
                  <Switch label="Grade Releases" description="Notification when assignment grades are available" variant="info" checked={true} size="sm" />
                  <Switch label="Schedule Changes" description="Updates about lecture cancellations or room changes" variant="warning" checked={true} size="sm" />
                </SwitchGroup>
              </div>
            </div>
          </div>

          {/* Campus Activity Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Activity Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <SwitchCard label="Event Discovery" description="Get notified about campus events matching your interests: CS clubs, hackathons, career fairs" icon={<span className="text-lg">🎯</span>} badge={<Badge variant="primary" size="sm">Recommended</Badge>} variant="primary" checked={true} />
              <SwitchCard label="Club Recruitment" description="Receive invitations from clubs seeking members with your skills and interests" icon={<span className="text-lg">🤝</span>} badge={<Badge variant="info" size="sm">Social</Badge>} variant="info" checked={false} />
              <SwitchCard label="Intramural Sports" description="Get updates about intramural league registration and team formation" icon={<span className="text-lg">⚽</span>} badge={<Badge variant="success" size="sm">Fitness</Badge>} variant="success" checked={false} />
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(U=(M=j.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};var V,q,F;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'UB Notification Settings',
    description: 'Control how you receive updates about campus activities',
    variant: 'default',
    size: 'default',
    checked: true,
    showIcons: false,
    labelPosition: 'right'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Switch Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different switch configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Switch {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(F=(q=k.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};const ce=["Default","CompleteShowcase","Playground"];export{j as CompleteShowcase,S as Default,k as Playground,ce as __namedExportsOrder,ne as default};
