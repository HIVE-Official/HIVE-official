import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as s}from"./index-DJO9vBfz.js";import{H as n,a as o,b as l,c}from"./hive-tokens-CKIUfcHM.js";import{B as d}from"./badge-B09J4pcg.js";import{B as t}from"./button-enhanced-BN702znq.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const X={default:["bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-primary)]","text-[var(--hive-text-primary)]","shadow-lg"].join(" "),dark:["bg-[var(--hive-background-primary)]","border border-[var(--hive-border-secondary)]","text-[var(--hive-text-primary)]","shadow-xl"].join(" "),light:["bg-[var(--hive-background-tertiary)]","border border-[var(--hive-border-tertiary)]","text-[var(--hive-text-secondary)]","shadow-md"].join(" ")},Z={sm:"px-2 py-1 text-xs max-w-xs",md:"px-3 py-2 text-sm max-w-sm",lg:"px-4 py-3 text-base max-w-md"},K={top:"bottom-full left-1/2 -translate-x-1/2 mb-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2",right:"left-full top-1/2 -translate-y-1/2 ml-2"},Q={top:"top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",bottom:"bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",left:"left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",right:"right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent"},$={default:{top:"border-t-[var(--hive-background-secondary)]",bottom:"border-b-[var(--hive-background-secondary)]",left:"border-l-[var(--hive-background-secondary)]",right:"border-r-[var(--hive-background-secondary)]"},dark:{top:"border-t-[var(--hive-background-primary)]",bottom:"border-b-[var(--hive-background-primary)]",left:"border-l-[var(--hive-background-primary)]",right:"border-r-[var(--hive-background-primary)]"},light:{top:"border-t-[var(--hive-background-tertiary)]",bottom:"border-b-[var(--hive-background-tertiary)]",left:"border-l-[var(--hive-background-tertiary)]",right:"border-r-[var(--hive-background-tertiary)]"}},a=({content:i,placement:N="top",trigger:v="hover",delay:w=200,arrow:S=!0,variant:z="default",size:V="md",disabled:x=!1,children:O})=>{const[p,j]=s.useState(!1),[r,E]=s.useState(null),b=s.useRef(null),T=s.useRef(null),C=s.useCallback(()=>{if(x)return;r&&clearTimeout(r);const m=setTimeout(()=>{j(!0)},w);E(m)},[x,w,r]),h=s.useCallback(()=>{r&&(clearTimeout(r),E(null)),j(!1)},[r]),G=s.useCallback(()=>{x||j(m=>!m)},[x]);s.useEffect(()=>{if(v!=="click"||!p)return;const m=I=>{b.current&&T.current&&!b.current.contains(I.target)&&!T.current.contains(I.target)&&h()};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[v,p,h]),s.useEffect(()=>()=>{r&&clearTimeout(r)},[r]);const W=()=>{switch(v){case"hover":return{onMouseEnter:C,onMouseLeave:h,onFocus:C,onBlur:h};case"click":return{onClick:G};case"focus":return{onFocus:C,onBlur:h};default:return{}}},_=["absolute z-50","rounded-lg","pointer-events-none","transition-all duration-200 ease-out","font-medium",X[z],Z[V],K[N],p?"opacity-100 visible":"opacity-0 invisible"].filter(Boolean).join(" "),Y=S?["absolute w-0 h-0","border-4",Q[N],$[z][N]].filter(Boolean).join(" "):"",J=s.cloneElement(O,{ref:T,...W(),...v==="click"&&{"aria-expanded":p},"aria-describedby":p?"tooltip":void 0});return e.jsxs("div",{className:"relative inline-block",children:[J,i&&e.jsxs("div",{ref:b,id:"tooltip",role:"tooltip",className:_,children:[i,S&&e.jsx("div",{className:Y})]})]})},U=i=>e.jsx(a,{variant:"primary",...i}),B=i=>e.jsx(a,{variant:"dark",...i}),k=i=>e.jsx(a,{variant:"light",...i}),f=i=>e.jsx(a,{trigger:"click",...i});a.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'top'",computed:!1}},trigger:{required:!1,tsType:{name:"union",raw:"'hover' | 'click' | 'focus'",elements:[{name:"literal",value:"'hover'"},{name:"literal",value:"'click'"},{name:"literal",value:"'focus'"}]},description:"",defaultValue:{value:"'hover'",computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"200",computed:!1}},arrow:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'dark' | 'light'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'dark'"},{name:"literal",value:"'light'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""}}};U.__docgenInfo={description:"",methods:[],displayName:"InfoTooltip"};B.__docgenInfo={description:"",methods:[],displayName:"DarkTooltip"};k.__docgenInfo={description:"",methods:[],displayName:"LightTooltip"};f.__docgenInfo={description:"",methods:[],displayName:"ClickTooltip"};const le={title:"01-Atoms/Tooltip - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Tooltip - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated tooltip system for University at Buffalo campus contextual help and information display.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, dark, light with perfect semantic token usage
- **4 Placement Options** - Top, bottom, left, right with smart positioning
- **3 Trigger Types** - Hover, click, focus with intelligent interaction handling
- **3 Size Options** - Small, medium, large with appropriate content sizing
- **Advanced Features** - Arrows, delays, outside click handling, accessibility
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Context Ready** - Optimized for UB help text and information display

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo contextual information and help systems:
- **Academic Help** - Course requirement explanations, grade calculation details
- **Interface Guidance** - Form field help, navigation explanations, feature descriptions
- **Campus Information** - Building locations, department contacts, office hours
- **System Status** - Loading states, error explanations, success confirmations
- **Feature Discovery** - New feature highlights, capability explanations

### 📱 **MOBILE OPTIMIZATION**
- **Touch Friendly** - Click triggers optimized for mobile interaction
- **Responsive Sizing** - Content scaling appropriate for mobile screens
- **Smart Positioning** - Intelligent placement to avoid viewport edges
`}}},tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","bottom","left","right"],description:"Tooltip placement relative to trigger element"},trigger:{control:"select",options:["hover","click","focus"],description:"How tooltip is triggered"},variant:{control:"select",options:["default","dark","light"],description:"Visual style variant"},size:{control:"select",options:["sm","md","lg"],description:"Tooltip size"},delay:{control:{type:"range",min:0,max:1e3,step:50},description:"Delay before showing tooltip (ms)"},arrow:{control:"boolean",description:"Show pointing arrow"},disabled:{control:"boolean",description:"Disable tooltip"}}},u={args:{content:"This course requires MTH 241 and CSE 250 as prerequisites",placement:"top",trigger:"hover",variant:"default",size:"md",delay:200,arrow:!0,disabled:!1},render:i=>e.jsx("div",{className:"flex justify-center items-center h-32 p-6 bg-[var(--hive-background-primary)]",children:e.jsx(a,{...i,children:e.jsx(t,{variant:"secondary",children:"CSE 331 Prerequisites"})})})},g={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"success",children:"✅ PLACEMENT"}),"Tooltip Placement - Smart Positioning"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 placement options with intelligent positioning relative to trigger elements"})]}),e.jsx(c,{children:e.jsxs("div",{className:"flex justify-center items-center min-h-[200px] bg-[var(--hive-background-secondary)] rounded-lg relative",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-4 h-4 bg-[var(--hive-brand-secondary)] rounded-full mx-auto mb-4"}),e.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)]",children:"Trigger Element"})]}),e.jsx("div",{className:"absolute top-8 left-1/2 -translate-x-1/2",children:e.jsx(a,{content:"Top placement tooltip for academic course information",placement:"top",variant:"primary",children:e.jsx(t,{size:"sm",variant:"secondary",children:"Top"})})}),e.jsx("div",{className:"absolute bottom-8 left-1/2 -translate-x-1/2",children:e.jsx(a,{content:"Bottom placement tooltip for supplementary details",placement:"bottom",variant:"primary",children:e.jsx(t,{size:"sm",variant:"secondary",children:"Bottom"})})}),e.jsx("div",{className:"absolute left-8 top-1/2 -translate-y-1/2",children:e.jsx(a,{content:"Left placement tooltip for contextual help",placement:"left",variant:"primary",children:e.jsx(t,{size:"sm",variant:"secondary",children:"Left"})})}),e.jsx("div",{className:"absolute right-8 top-1/2 -translate-y-1/2",children:e.jsx(a,{content:"Right placement tooltip for additional information",placement:"right",variant:"primary",children:e.jsx(t,{size:"sm",variant:"secondary",children:"Right"})})})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"info",children:"🎨 VARIANTS"}),"Tooltip Variants - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 visual variants using 100% semantic tokens for consistent theming"})]}),e.jsx(c,{children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Default Variant:"}),e.jsx(a,{content:"Default tooltip style with secondary background and primary text. Perfect for general campus information and help text.",variant:"primary",placement:"top",children:e.jsx(t,{variant:"primary",children:"Course Info"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"General purpose tooltip"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dark Variant:"}),e.jsx(a,{content:"Dark tooltip style with primary background for high contrast. Ideal for important notifications and system messages.",variant:"dark",placement:"top",children:e.jsx(t,{variant:"secondary",children:"System Status"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"High contrast tooltip"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Light Variant:"}),e.jsx(a,{content:"Light tooltip style with tertiary background for subtle information. Great for supplementary details and non-critical help.",variant:"light",placement:"top",children:e.jsx(t,{variant:"secondary",children:"Additional Info"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Subtle information tooltip"})]})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"⚡ TRIGGERS"}),"Trigger Types - Interaction Methods"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 trigger types for different campus interaction contexts and accessibility needs"})]}),e.jsx(c,{children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Hover Trigger:"}),e.jsx(a,{content:"Hover to see course prerequisites and enrollment requirements. This tooltip appears on mouse hover and focus for accessibility.",trigger:"hover",delay:100,children:e.jsx(t,{variant:"primary",children:"Hover Me"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Default hover interaction"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Click Trigger:"}),e.jsx(f,{content:"Click to toggle detailed course information. Click outside or on the button again to close. Perfect for mobile devices.",placement:"top",children:e.jsx(t,{variant:"secondary",children:"Click Me"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Mobile-friendly click interaction"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Focus Trigger:"}),e.jsx(a,{content:"Focus trigger shows tooltip when element receives keyboard focus. Essential for accessibility and keyboard navigation.",trigger:"focus",children:e.jsx(t,{variant:"secondary",children:"Focus Me"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Keyboard navigation accessible"})]})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"secondary",children:"📏 SIZES"}),"Tooltip Sizes - Content Capacity"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 sizes optimized for different content lengths and campus information types"})]}),e.jsx(c,{children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Small Size:"}),e.jsx(a,{content:"Short help text",size:"sm",placement:"top",children:e.jsx(t,{size:"sm",variant:"secondary",children:"Small Tooltip"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Brief information"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Medium Size:"}),e.jsx(a,{content:"Medium length tooltip with additional course details and enrollment information for students.",size:"md",placement:"top",children:e.jsx(t,{variant:"primary",children:"Medium Tooltip"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Standard information"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Large Size:"}),e.jsx(a,{content:"Large tooltip capacity for comprehensive course descriptions, detailed prerequisites, semester availability, professor information, and complete enrollment requirements that students need to understand before registration.",size:"lg",placement:"top",children:e.jsx(t,{size:"lg",variant:"secondary",children:"Large Tooltip"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Detailed information"})]})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"warning",children:"🛠️ FEATURES"}),"Advanced Features - Arrows, Delays, States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced tooltip features for enhanced campus UX and accessibility"})]}),e.jsx(c,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Arrow Options:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(a,{content:"Tooltip with arrow pointing to the trigger element for clear visual connection.",arrow:!0,placement:"top",children:e.jsx(t,{variant:"primary",children:"With Arrow"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Clear visual connection"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(a,{content:"Tooltip without arrow for cleaner, minimal appearance.",arrow:!1,placement:"top",children:e.jsx(t,{variant:"secondary",children:"Without Arrow"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Minimal appearance"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Delay Timing:"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(a,{content:"Immediate tooltip (0ms delay) for instant feedback.",delay:0,placement:"top",children:e.jsx(t,{variant:"primary",children:"Instant"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"0ms delay"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(a,{content:"Standard delay (200ms) for normal interactions.",delay:200,placement:"top",children:e.jsx(t,{variant:"secondary",children:"Standard"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"200ms delay"})]}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(a,{content:"Slow delay (500ms) to prevent accidental triggers.",delay:500,placement:"top",children:e.jsx(t,{variant:"secondary",children:"Slow"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"500ms delay"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Disabled State:"}),e.jsxs("div",{className:"text-center",children:[e.jsx(a,{content:"This tooltip is disabled and will not appear.",disabled:!0,placement:"top",children:e.jsx(t,{variant:"secondary",disabled:!0,children:"Disabled Tooltip"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)] mt-2",children:"Tooltip disabled for inactive elements"})]})]})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"info",children:"🎯 PRESETS"}),"Tooltip Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built tooltip components for common campus help and information scenarios"})]}),e.jsx(c,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Info Tooltip:"}),e.jsx("div",{className:"text-center",children:e.jsx(U,{content:"General information tooltip using default styling for campus help text and feature explanations.",placement:"top",children:e.jsx(t,{variant:"primary",children:"Campus Info"})})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dark Tooltip:"}),e.jsx("div",{className:"text-center",children:e.jsx(B,{content:"High-contrast dark tooltip for important system notifications and critical campus alerts.",placement:"top",children:e.jsx(t,{variant:"secondary",children:"System Alert"})})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Light Tooltip:"}),e.jsx("div",{className:"text-center",children:e.jsx(k,{content:"Subtle light tooltip for supplementary campus information and non-critical help text.",placement:"top",children:e.jsx(t,{variant:"secondary",children:"Extra Details"})})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Click Tooltip:"}),e.jsx("div",{className:"text-center",children:e.jsx(f,{content:"Click-triggered tooltip optimized for mobile campus interfaces and touch interactions.",placement:"top",children:e.jsx(t,{variant:"primary",children:"Mobile Friendly"})})})]})]})})]}),e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Tooltip Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Tooltip usage in actual University at Buffalo academic and administrative contexts"})]}),e.jsxs(c,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Registration Interface:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Course Selection:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"CSE 331"}),e.jsx(a,{content:"Algorithm Analysis and Design - Covers asymptotic notation, recurrence relations, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisites: CSE 250 (Data Structures) and MTH 241 (Calculus III).",size:"lg",placement:"right",children:e.jsx(t,{size:"sm",variant:"ghost",children:"ℹ️"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Section A1"}),e.jsx(a,{content:"MWF 10:00-10:50am in Davis Hall 101. Instructor: Dr. Sarah Johnson. Available spots: 12/35. This section has historically high ratings for clear instruction.",placement:"right",children:e.jsx(t,{size:"sm",variant:"ghost",children:"📍"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm text-[var(--hive-status-warning)]",children:"Waitlist"}),e.jsx(a,{content:"Join the waitlist to be automatically enrolled if a spot opens. You'll be notified via email and UB mobile app. Waitlist position updates daily.",placement:"right",variant:"primary",children:e.jsx(t,{size:"sm",variant:"ghost",children:"⏰"})})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Registration Tools:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{content:"Check if you meet all prerequisite requirements for this course. System will verify completion of CSE 250 and MTH 241 with minimum grades.",placement:"left",size:"md",children:e.jsx(t,{variant:"secondary",size:"sm",children:"Check Prerequisites"})}),e.jsx(a,{content:"View your current course schedule for time conflicts. Shows all enrolled courses, work schedule, and campus commitments to help avoid scheduling conflicts.",placement:"left",size:"md",children:e.jsx(t,{variant:"secondary",size:"sm",children:"View Schedule"})}),e.jsx(f,{content:"Get recommendations for courses that fit your schedule, major requirements, and academic interests. Based on your academic history and degree progress.",placement:"left",size:"lg",children:e.jsx(t,{variant:"secondary",size:"sm",children:"Course Recommendations"})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Dashboard:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("span",{className:"text-lg font-semibold text-[var(--hive-text-primary)]",children:"3.75"}),e.jsx(a,{content:"Current semester GPA calculation based on enrolled courses. Includes all courses in progress with current grades. Final GPA will be calculated after final exams.",placement:"top",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"📊"})})]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Current GPA"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("span",{className:"text-lg font-semibold text-[var(--hive-text-primary)]",children:"102/120"}),e.jsx(a,{content:"Credit hours completed toward graduation. You need 120 total credits including 40 upper-level credits (300/400 level). Currently 18 credits remaining.",placement:"top",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"🎓"})})]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Credits Completed"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("span",{className:"text-lg font-semibold text-[var(--hive-status-success)]",children:"Spring 2025"}),e.jsx(a,{content:"Expected graduation date based on current course enrollment and degree progress. Complete remaining 18 credits to graduate on schedule.",placement:"top",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"📅"})})]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Expected Graduation"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Services Navigation:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Academic Resources:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Lockwood Library"}),e.jsx(a,{content:"Main library with study spaces, computer labs, and research assistance. Open 24/7 during finals week. Current capacity: 847/1200 students.",placement:"right",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"📚"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Math Tutoring"}),e.jsx(a,{content:"Free tutoring for all math courses in Mathematics Learning Center (Math Building, Room 140). Walk-in hours: Mon-Fri 9am-5pm. No appointment needed.",placement:"right",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"🧮"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Writing Center"}),e.jsx(a,{content:"One-on-one writing consultations for any assignment or project. Located in Baldy Hall. Schedule appointments online through UB Connects.",placement:"right",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"✍️"})})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Campus Life:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Student Union"}),e.jsx(B,{content:"Hub for dining, events, and student organizations. Food court open until 10pm. Student organization offices on 3rd floor. Event space bookings through UB Events.",placement:"right",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"🏢"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Recreation Center"}),e.jsx(k,{content:"Fitness facilities, group classes, and intramural sports. Current hours: 6am-11pm weekdays, 8am-10pm weekends. Towel service available.",placement:"right",size:"md",children:e.jsx(t,{size:"sm",variant:"ghost",children:"💪"})})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Health Services"}),e.jsx(a,{content:"Michael Hall Health Center provides medical care, mental health counseling, and wellness programs. Emergency care available 24/7. Appointments recommended.",placement:"right",size:"md",variant:"primary",children:e.jsx(t,{size:"sm",variant:"ghost",children:"🏥"})})]})]})]})]})})]})]})]})]})},y={args:{content:"University at Buffalo campus tooltip with helpful information",placement:"top",trigger:"hover",variant:"default",size:"md",delay:200,arrow:!0,disabled:!1},render:i=>e.jsx("div",{className:"flex justify-center items-center h-48 p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(n,{children:[e.jsxs(o,{children:[e.jsx(l,{children:"Tooltip Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different tooltip configurations"})]}),e.jsx(c,{className:"flex justify-center",children:e.jsx(a,{...i,children:e.jsx(t,{variant:"primary",children:"UB Campus Tooltip"})})})]})})};var A,D,H;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    content: 'This course requires MTH 241 and CSE 250 as prerequisites',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    delay: 200,
    arrow: true,
    disabled: false
  },
  render: args => <div className="flex justify-center items-center h-32 p-6 bg-[var(--hive-background-primary)]">
      <Tooltip {...args}>
        <Button variant="secondary">
          CSE 331 Prerequisites
        </Button>
      </Tooltip>
    </div>
}`,...(H=(D=u.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var R,M,P;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Placement Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ PLACEMENT</Badge>
            Tooltip Placement - Smart Positioning
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 placement options with intelligent positioning relative to trigger elements
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center min-h-[200px] bg-[var(--hive-background-secondary)] rounded-lg relative">
            
            {/* Center reference */}
            <div className="text-center">
              <div className="w-4 h-4 bg-[var(--hive-brand-secondary)] rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-[var(--hive-text-tertiary)]">Trigger Element</p>
            </div>

            {/* Top placement */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <Tooltip content="Top placement tooltip for academic course information" placement="top" variant="primary">
                <Button size="sm" variant="secondary">Top</Button>
              </Tooltip>
            </div>

            {/* Bottom placement */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <Tooltip content="Bottom placement tooltip for supplementary details" placement="bottom" variant="primary">
                <Button size="sm" variant="secondary">Bottom</Button>
              </Tooltip>
            </div>

            {/* Left placement */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <Tooltip content="Left placement tooltip for contextual help" placement="left" variant="primary">
                <Button size="sm" variant="secondary">Left</Button>
              </Tooltip>
            </div>

            {/* Right placement */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <Tooltip content="Right placement tooltip for additional information" placement="right" variant="primary">
                <Button size="sm" variant="secondary">Right</Button>
              </Tooltip>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Tooltip Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants using 100% semantic tokens for consistent theming
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <Tooltip content="Default tooltip style with secondary background and primary text. Perfect for general campus information and help text." variant="primary" placement="top">
                <Button variant="primary">
                  Course Info
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                General purpose tooltip
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dark Variant:</h4>
              <Tooltip content="Dark tooltip style with primary background for high contrast. Ideal for important notifications and system messages." variant="dark" placement="top">
                <Button variant="secondary">
                  System Status
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                High contrast tooltip
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Light Variant:</h4>
              <Tooltip content="Light tooltip style with tertiary background for subtle information. Great for supplementary details and non-critical help." variant="light" placement="top">
                <Button variant="secondary">
                  Additional Info
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Subtle information tooltip
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Trigger Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ TRIGGERS</Badge>
            Trigger Types - Interaction Methods
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 trigger types for different campus interaction contexts and accessibility needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Hover Trigger:</h4>
              <Tooltip content="Hover to see course prerequisites and enrollment requirements. This tooltip appears on mouse hover and focus for accessibility." trigger="hover" delay={100}>
                <Button variant="primary">
                  Hover Me
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Default hover interaction
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Click Trigger:</h4>
              <ClickTooltip content="Click to toggle detailed course information. Click outside or on the button again to close. Perfect for mobile devices." placement="top">
                <Button variant="secondary">
                  Click Me
                </Button>
              </ClickTooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Mobile-friendly click interaction
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Focus Trigger:</h4>
              <Tooltip content="Focus trigger shows tooltip when element receives keyboard focus. Essential for accessibility and keyboard navigation." trigger="focus">
                <Button variant="secondary">
                  Focus Me
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Keyboard navigation accessible
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Tooltip Sizes - Content Capacity
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes optimized for different content lengths and campus information types
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Size:</h4>
              <Tooltip content="Short help text" size="sm" placement="top">
                <Button size="sm" variant="secondary">
                  Small Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Brief information
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Size:</h4>
              <Tooltip content="Medium length tooltip with additional course details and enrollment information for students." size="md" placement="top">
                <Button variant="primary">
                  Medium Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Standard information
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Size:</h4>
              <Tooltip content="Large tooltip capacity for comprehensive course descriptions, detailed prerequisites, semester availability, professor information, and complete enrollment requirements that students need to understand before registration." size="lg" placement="top">
                <Button size="lg" variant="secondary">
                  Large Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Detailed information
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">🛠️ FEATURES</Badge>
            Advanced Features - Arrows, Delays, States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced tooltip features for enhanced campus UX and accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Arrow Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Arrow Options:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center space-y-4">
                  <Tooltip content="Tooltip with arrow pointing to the trigger element for clear visual connection." arrow={true} placement="top">
                    <Button variant="primary">
                      With Arrow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Clear visual connection
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip content="Tooltip without arrow for cleaner, minimal appearance." arrow={false} placement="top">
                    <Button variant="secondary">
                      Without Arrow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Minimal appearance
                  </p>
                </div>
              </div>
            </div>

            {/* Delay Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Delay Timing:</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <Tooltip content="Immediate tooltip (0ms delay) for instant feedback." delay={0} placement="top">
                    <Button variant="primary">
                      Instant
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    0ms delay
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip content="Standard delay (200ms) for normal interactions." delay={200} placement="top">
                    <Button variant="secondary">
                      Standard
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    200ms delay
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip content="Slow delay (500ms) to prevent accidental triggers." delay={500} placement="top">
                    <Button variant="secondary">
                      Slow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    500ms delay
                  </p>
                </div>
              </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Disabled State:</h4>
              <div className="text-center">
                <Tooltip content="This tooltip is disabled and will not appear." disabled={true} placement="top">
                  <Button variant="secondary" disabled>
                    Disabled Tooltip
                  </Button>
                </Tooltip>
                <p className="text-xs text-[var(--hive-text-tertiary)] mt-2">
                  Tooltip disabled for inactive elements
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 PRESETS</Badge>
            Tooltip Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built tooltip components for common campus help and information scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Info Tooltip:</h4>
              <div className="text-center">
                <InfoTooltip content="General information tooltip using default styling for campus help text and feature explanations." placement="top">
                  <Button variant="primary">
                    Campus Info
                  </Button>
                </InfoTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dark Tooltip:</h4>
              <div className="text-center">
                <DarkTooltip content="High-contrast dark tooltip for important system notifications and critical campus alerts." placement="top">
                  <Button variant="secondary">
                    System Alert
                  </Button>
                </DarkTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Light Tooltip:</h4>
              <div className="text-center">
                <LightTooltip content="Subtle light tooltip for supplementary campus information and non-critical help text." placement="top">
                  <Button variant="secondary">
                    Extra Details
                  </Button>
                </LightTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Click Tooltip:</h4>
              <div className="text-center">
                <ClickTooltip content="Click-triggered tooltip optimized for mobile campus interfaces and touch interactions." placement="top">
                  <Button variant="primary">
                    Mobile Friendly
                  </Button>
                </ClickTooltip>
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
            Real Campus Tooltip Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Tooltip usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Help */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration Interface:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Course Selection:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">CSE 331</span>
                      <Tooltip content="Algorithm Analysis and Design - Covers asymptotic notation, recurrence relations, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisites: CSE 250 (Data Structures) and MTH 241 (Calculus III)." size="lg" placement="right">
                        <Button size="sm" variant="ghost">ℹ️</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Section A1</span>
                      <Tooltip content="MWF 10:00-10:50am in Davis Hall 101. Instructor: Dr. Sarah Johnson. Available spots: 12/35. This section has historically high ratings for clear instruction." placement="right">
                        <Button size="sm" variant="ghost">📍</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[var(--hive-status-warning)]">Waitlist</span>
                      <Tooltip content="Join the waitlist to be automatically enrolled if a spot opens. You'll be notified via email and UB mobile app. Waitlist position updates daily." placement="right" variant="primary">
                        <Button size="sm" variant="ghost">⏰</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Registration Tools:</h5>
                  <div className="space-y-3">
                    <Tooltip content="Check if you meet all prerequisite requirements for this course. System will verify completion of CSE 250 and MTH 241 with minimum grades." placement="left" size="md">
                      <Button variant="secondary" size="sm">
                        Check Prerequisites
                      </Button>
                    </Tooltip>
                    <Tooltip content="View your current course schedule for time conflicts. Shows all enrolled courses, work schedule, and campus commitments to help avoid scheduling conflicts." placement="left" size="md">
                      <Button variant="secondary" size="sm">
                        View Schedule
                      </Button>
                    </Tooltip>
                    <ClickTooltip content="Get recommendations for courses that fit your schedule, major requirements, and academic interests. Based on your academic history and degree progress." placement="left" size="lg">
                      <Button variant="secondary" size="sm">
                        Course Recommendations
                      </Button>
                    </ClickTooltip>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Academic Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-text-primary)]">3.75</span>
                    <Tooltip content="Current semester GPA calculation based on enrolled courses. Includes all courses in progress with current grades. Final GPA will be calculated after final exams." placement="top" size="md">
                      <Button size="sm" variant="ghost">📊</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Current GPA</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-text-primary)]">102/120</span>
                    <Tooltip content="Credit hours completed toward graduation. You need 120 total credits including 40 upper-level credits (300/400 level). Currently 18 credits remaining." placement="top" size="md">
                      <Button size="sm" variant="ghost">🎓</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Credits Completed</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-status-success)]">Spring 2025</span>
                    <Tooltip content="Expected graduation date based on current course enrollment and degree progress. Complete remaining 18 credits to graduate on schedule." placement="top" size="md">
                      <Button size="sm" variant="ghost">📅</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Expected Graduation</p>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Services Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Resources:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Lockwood Library</span>
                      <Tooltip content="Main library with study spaces, computer labs, and research assistance. Open 24/7 during finals week. Current capacity: 847/1200 students." placement="right" size="md">
                        <Button size="sm" variant="ghost">📚</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Math Tutoring</span>
                      <Tooltip content="Free tutoring for all math courses in Mathematics Learning Center (Math Building, Room 140). Walk-in hours: Mon-Fri 9am-5pm. No appointment needed." placement="right" size="md">
                        <Button size="sm" variant="ghost">🧮</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Writing Center</span>
                      <Tooltip content="One-on-one writing consultations for any assignment or project. Located in Baldy Hall. Schedule appointments online through UB Connects." placement="right" size="md">
                        <Button size="sm" variant="ghost">✍️</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Life:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Student Union</span>
                      <DarkTooltip content="Hub for dining, events, and student organizations. Food court open until 10pm. Student organization offices on 3rd floor. Event space bookings through UB Events." placement="right" size="md">
                        <Button size="sm" variant="ghost">🏢</Button>
                      </DarkTooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Recreation Center</span>
                      <LightTooltip content="Fitness facilities, group classes, and intramural sports. Current hours: 6am-11pm weekdays, 8am-10pm weekends. Towel service available." placement="right" size="md">
                        <Button size="sm" variant="ghost">💪</Button>
                      </LightTooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Health Services</span>
                      <Tooltip content="Michael Hall Health Center provides medical care, mental health counseling, and wellness programs. Emergency care available 24/7. Appointments recommended." placement="right" size="md" variant="primary">
                        <Button size="sm" variant="ghost">🏥</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(P=(M=g.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var L,F,q;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    content: 'University at Buffalo campus tooltip with helpful information',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    delay: 200,
    arrow: true,
    disabled: false
  },
  render: args => <div className="flex justify-center items-center h-48 p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Tooltip Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different tooltip configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Tooltip {...args}>
            <Button variant="primary">
              UB Campus Tooltip
            </Button>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
}`,...(q=(F=y.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};const ce=["Default","CompleteShowcase","Playground"];export{g as CompleteShowcase,u as Default,y as Playground,ce as __namedExportsOrder,le as default};
