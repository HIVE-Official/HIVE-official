import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as _}from"./index-DJO9vBfz.js";import{c as X}from"./utils-CytzSlOG.js";import{H as m,c as x,a as v,b as p}from"./hive-tokens-BKUtHA8Z.js";import{B as y}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const c={xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem","3xl":"4rem","4xl":"6rem"},q={xs:{base:"xs",sm:"sm",md:"md",lg:"lg"},sm:{base:"sm",sm:"md",md:"lg",lg:"xl"},md:{base:"md",sm:"lg",md:"xl",lg:"2xl"},lg:{base:"lg",sm:"xl",md:"2xl",lg:"3xl"},xl:{base:"xl",sm:"2xl",md:"3xl",lg:"4xl"},"2xl":{base:"2xl",sm:"3xl",md:"4xl",lg:"4xl"},"3xl":{base:"3xl",sm:"4xl",md:"4xl",lg:"4xl"},"4xl":{base:"4xl",sm:"4xl",md:"4xl",lg:"4xl"}},n=_.forwardRef(({size:i="md",direction:o="vertical",responsive:j=!1,flexible:T=!1,debug:f=!1,className:F,style:S,...P},M)=>{const U=()=>{const t={};if(T)return(o==="horizontal"||o==="both")&&(t.flexGrow=1),(o==="vertical"||o==="both")&&(t.flexGrow=1),t;const d=c[i];switch(o){case"horizontal":t.width=d,t.minWidth=d;break;case"vertical":t.height=d,t.minHeight=d;break;case"both":t.width=d,t.height=d,t.minWidth=d,t.minHeight=d;break}return t},G=["flex-shrink-0",T&&"flex-1",j&&(()=>{if(!j)return"";const t=q[i],d=[];return(o==="vertical"||o==="both")&&d.push(`h-[${c[t.base]}]`,`sm:h-[${c[t.sm]}]`,`md:h-[${c[t.md]}]`,`lg:h-[${c[t.lg]}]`),(o==="horizontal"||o==="both")&&d.push(`w-[${c[t.base]}]`,`sm:w-[${c[t.sm]}]`,`md:w-[${c[t.md]}]`,`lg:w-[${c[t.lg]}]`),d.join(" ")})(),f&&["bg-[color-mix(in_srgb,var(--hive-status-error)_20%,transparent)]","border border-dashed border-[var(--hive-status-error)]","relative"].filter(Boolean).join(" ")].filter(Boolean).join(" "),O={...U(),...S};return e.jsx("div",{ref:M,className:X(G,F),style:j?S:O,"aria-hidden":"true",...P,children:f&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsxs("span",{className:"text-xs font-mono text-[var(--hive-status-error)] bg-[var(--hive-background-primary)] px-1 rounded",children:[i," ",o]})})})});n.displayName="Spacer";const r=i=>e.jsx(n,{direction:"vertical",...i}),s=i=>e.jsx(n,{direction:"horizontal",...i}),l=i=>e.jsx(n,{flexible:!0,...i}),u=i=>e.jsx(n,{responsive:!0,...i}),V=i=>e.jsx(n,{size:"xs",...i}),I=i=>e.jsx(n,{size:"sm",...i}),B=i=>e.jsx(n,{size:"md",...i}),D=i=>e.jsx(n,{size:"lg",...i}),N={xs:()=>e.jsx(s,{size:"xs"}),sm:()=>e.jsx(s,{size:"sm"}),md:()=>e.jsx(s,{size:"md"}),lg:()=>e.jsx(s,{size:"lg"}),xl:()=>e.jsx(s,{size:"xl"}),"2xl":()=>e.jsx(s,{size:"2xl"}),"3xl":()=>e.jsx(s,{size:"3xl"}),"4xl":()=>e.jsx(s,{size:"4xl"})};n.__docgenInfo={description:"",methods:[],displayName:"Spacer",props:{size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'2xl'"},{name:"literal",value:"'3xl'"},{name:"literal",value:"'4xl'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical' | 'both'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"},{name:"literal",value:"'both'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}},responsive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},flexible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},debug:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};r.__docgenInfo={description:"",methods:[],displayName:"VerticalSpacer"};s.__docgenInfo={description:"",methods:[],displayName:"HorizontalSpacer"};l.__docgenInfo={description:"",methods:[],displayName:"FlexibleSpacer"};u.__docgenInfo={description:"",methods:[],displayName:"ResponsiveSpacer"};V.__docgenInfo={description:"",methods:[],displayName:"TinySpacer"};I.__docgenInfo={description:"",methods:[],displayName:"SmallSpacer"};B.__docgenInfo={description:"",methods:[],displayName:"MediumSpacer"};D.__docgenInfo={description:"",methods:[],displayName:"LargeSpacer"};const se={title:"01-Atoms/Spacer - COMPLETE DEFINITION",component:n,parameters:{docs:{description:{component:`
## 🎯 HIVE Spacer - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated spacing system for University at Buffalo campus interface layouts and visual rhythm.

### 🏆 **COMPONENT EXCELLENCE**
- **8 Size Options** - From xs (4px) to 4xl (96px) for precise spacing control
- **3 Direction Types** - Horizontal, vertical, and both for complete layout flexibility
- **Responsive Spacing** - Automatic size scaling across device breakpoints
- **Flexible Growth** - Dynamic spacing that grows to fill available space
- **Debug Visualization** - Visual debugging mode for layout development
- **Perfect Semantic Tokens** - 100% semantic token usage for debug styling
- **Smart Accessibility** - Hidden from screen readers with aria-hidden
- **Campus Layout Ready** - Optimized for UB content organization and visual hierarchy

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface spacing and content organization:
- **Academic Content** - Spacing between course sections, assignment groups
- **Administrative Forms** - Consistent spacing in registration and enrollment forms
- **Campus Information** - Organized spacing in event details, news articles
- **Navigation Layout** - Proper spacing between menu items and breadcrumbs
- **Data Display** - Structured spacing in student records and course catalogs
- **Mobile Interfaces** - Responsive spacing that works across all device sizes

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Scaling** - Automatic size adjustments for mobile screens
- **Touch-Friendly Spacing** - Appropriate spacing for mobile interactions
- **Consistent Rhythm** - Maintains visual hierarchy across device sizes
`}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl","2xl","3xl","4xl"],description:"Spacer size"},direction:{control:"select",options:["horizontal","vertical","both"],description:"Spacing direction"},responsive:{control:"boolean",description:"Enable responsive scaling"},flexible:{control:"boolean",description:"Enable flexible growth"},debug:{control:"boolean",description:"Show debug visualization"}}},h={args:{size:"md",direction:"vertical",responsive:!1,flexible:!1,debug:!0},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(m,{children:e.jsxs(x,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Content above the spacer"}),e.jsx(n,{...i}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Content below the spacer - showing controlled spacing for University at Buffalo interfaces"})]})})})},g={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"success",children:"📏 SIZES"}),"Spacer Sizes - Precise Spacing Control"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"8 sizes from xs (4px) to 4xl (96px) for complete layout flexibility"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Vertical Spacing Examples:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Extra Small (4px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 1"}),e.jsx(n,{size:"xs",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Small (8px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 1"}),e.jsx(n,{size:"sm",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Medium (16px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 1"}),e.jsx(n,{size:"md",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Large (24px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 1"}),e.jsx(n,{size:"lg",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Line 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Extra Large (32px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Section 1"}),e.jsx(n,{size:"xl",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Section 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"2X Large (48px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Block 1"}),e.jsx(n,{size:"2xl",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Block 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"3X Large (64px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Area 1"}),e.jsx(n,{size:"3xl",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Area 2"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h5",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"4X Large (96px):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-3 rounded-lg",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Region 1"}),e.jsx(n,{size:"4xl",debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"Region 2"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Horizontal Spacing Examples:"}),e.jsx("div",{className:"space-y-4",children:e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Item"}),e.jsx(s,{size:"xs",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"xs"}),e.jsx(s,{size:"sm",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"sm"}),e.jsx(s,{size:"md",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"md"}),e.jsx(s,{size:"lg",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"lg"}),e.jsx(s,{size:"xl",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"xl"})]})})})]})]})})]}),e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"info",children:"🧭 DIRECTIONS"}),"Spacing Directions - Layout Flexibility"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 direction types for complete control over spacing placement"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Vertical Direction:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Course Requirements"}),e.jsx(r,{size:"lg",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Core CS Courses"}),e.jsx(r,{size:"md",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Technical Electives"}),e.jsx(r,{size:"sm",debug:!0}),e.jsx(a,{variant:"body-sm",color:"muted",children:"General Education"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Horizontal Direction:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 331"}),e.jsx(s,{size:"lg",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Algorithm Analysis"}),e.jsx(s,{size:"md",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4 Credits"}),e.jsx(s,{size:"sm",debug:!0}),e.jsx(a,{variant:"body-sm",color:"muted",children:"Fall 2024"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Both Directions:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Column 1"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Content here"})]}),e.jsx(n,{direction:"both",size:"xl",debug:!0}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Column 2"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Content here"})]})]})})]})]})})]}),e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"primary",children:"📱 RESPONSIVE"}),"Responsive Spacing - Device Adaptation"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Automatic spacing adjustment across device breakpoints for optimal mobile experience"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Responsive Vertical Spacing:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Mobile: sm → Tablet: md → Desktop: lg"}),e.jsx(u,{size:"sm",direction:"vertical",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Spacing automatically adapts to screen size"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Responsive Horizontal Spacing:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Item 1"}),e.jsx(u,{size:"md",direction:"horizontal",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Item 2"}),e.jsx(u,{size:"md",direction:"horizontal",debug:!0}),e.jsx(a,{variant:"body-sm",color:"muted",children:"Item 3"})]})})]})]})})]}),e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"secondary",children:"🔄 FLEXIBLE"}),"Flexible Spacing - Dynamic Growth"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Dynamic spacing that grows to fill available space for perfect layouts"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Flexible Horizontal Growth:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Left Content"}),e.jsx(l,{direction:"horizontal",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Right Content"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Flexible Vertical Growth:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg h-40 flex flex-col",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Top Content"}),e.jsx(l,{direction:"vertical",debug:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Bottom Content"})]})]})]})})]}),e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"warning",children:"🎯 PRESETS"}),"Spacer Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built spacer components for common University at Buffalo interface patterns"})]}),e.jsx(x,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size-Based Presets:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-2",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"TinySpacer (xs)"}),e.jsx(V,{debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"SmallSpacer (sm)"}),e.jsx(I,{debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"MediumSpacer (md)"}),e.jsx(B,{debug:!0}),e.jsx(a,{variant:"body-xs",color:"primary",children:"LargeSpacer (lg)"}),e.jsx(D,{debug:!0})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Function-Based Presets:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-xs",color:"primary",children:"Gap.sm"}),N.sm(),e.jsx(a,{variant:"body-xs",color:"primary",children:"Gap.md"}),N.md(),e.jsx(a,{variant:"body-xs",color:"primary",children:"Gap.lg"}),N.lg(),e.jsx(a,{variant:"body-xs",color:"primary",children:"End"})]})})]})]})})]}),e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(y,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Spacing Usage Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Spacer usage in actual University at Buffalo academic and administrative interfaces"})]}),e.jsxs(x,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Listing Layout:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{as:"h3",variant:"heading-md",color:"primary",children:"Computer Science Courses - Fall 2024"}),e.jsx(r,{size:"lg"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Core Requirements"}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 250 - Data Structures"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4 Credits"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"Available"})]}),e.jsx(r,{size:"xs"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 331 - Algorithm Analysis"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4 Credits"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"ruby",children:"Waitlist"})]}),e.jsx(r,{size:"xs"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 410 - Software Engineering"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"3 Credits"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"Available"})]})]}),e.jsx(r,{size:"lg"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Technical Electives"}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 442 - Software Engineering"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4 Credits"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"Available"})]}),e.jsx(r,{size:"xs"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 460 - Machine Learning"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"3 Credits"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"Available"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Dashboard Sections:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{as:"h3",variant:"heading-lg",color:"primary",children:"Academic Dashboard"}),e.jsx(r,{size:"2xl"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"heading-sm",color:"gold",children:"Academic Progress"}),e.jsx(r,{size:"md"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(a,{variant:"display-sm",color:"emerald",weight:"bold",children:"3.75"}),e.jsx(r,{size:"xs"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Current GPA"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(a,{variant:"display-sm",color:"primary",weight:"bold",children:"102"}),e.jsx(r,{size:"xs"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Credits Earned"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(a,{variant:"display-sm",color:"gold",weight:"bold",children:"18"}),e.jsx(r,{size:"xs"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Credits Remaining"})]})]})]}),e.jsx(r,{size:"2xl"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"heading-sm",color:"gold",children:"Current Enrollment"}),e.jsx(r,{size:"md"}),e.jsxs("div",{className:"space-y-0",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"CSE 331"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Algorithm Analysis"})]}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"A- (92%)"})]}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"MTH 241"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"College Calculus"})]}),e.jsx(a,{variant:"body-sm",color:"primary",children:"B+ (88%)"})]}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"PHI 237"}),e.jsx(s,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Ethics"})]}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"A (95%)"})]})]})]}),e.jsx(r,{size:"2xl"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"heading-sm",color:"gold",children:"Upcoming Deadlines"}),e.jsx(r,{size:"md"}),e.jsxs("div",{className:"space-y-0",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"ruby",weight:"medium",children:"Tomorrow"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"CSE 331 Assignment 4"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"muted",children:"11:59 PM"})]}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Friday"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"MTH 241 Midterm Exam"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"muted",children:"2:00 PM"})]}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Next Week"}),e.jsx(s,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"PHI 237 Essay Draft"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"muted",children:"Monday"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Registration Form Layout:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{as:"h3",variant:"heading-md",color:"primary",children:"Course Registration - Spring 2025"}),e.jsx(r,{size:"lg"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Student Information"}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx("div",{children:e.jsx(a,{variant:"body-sm",color:"secondary",children:"Student ID: 50123456"})}),e.jsx("div",{children:e.jsx(a,{variant:"body-sm",color:"secondary",children:"Classification: Senior"})})]})]}),e.jsx(r,{size:"xl"}),e.jsxs("div",{className:"space-y-0",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Selection"}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"space-y-0",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Course Code"}),e.jsx(s,{size:"lg"}),e.jsx(a,{variant:"body-sm",color:"primary",children:"Course Title"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"primary",children:"Credits"})]}),e.jsx(r,{size:"sm"}),e.jsxs("div",{className:"flex items-center p-2 bg-[var(--hive-background-primary)] rounded",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"CSE 442"}),e.jsx(s,{size:"lg"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Software Engineering"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4"})]}),e.jsx(r,{size:"xs"}),e.jsxs("div",{className:"flex items-center p-2 bg-[var(--hive-background-primary)] rounded",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"CSE 460"}),e.jsx(s,{size:"lg"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Machine Learning"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"3"})]})]})]}),e.jsx(r,{size:"xl"}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Total Credits: 7"}),e.jsx("button",{className:"px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg",children:"Register for Courses"})]})]})})]})]})]})]})},b={args:{size:"lg",direction:"vertical",responsive:!1,flexible:!1,debug:!0},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(m,{children:[e.jsxs(v,{children:[e.jsx(p,{children:"Spacer Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different spacer configurations"})]}),e.jsxs(x,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Content above the spacer"}),e.jsx(n,{...i}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Content below the spacer - testing spacing for University at Buffalo interfaces"})]})]})})};var z,C,E;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    size: 'md',
    direction: 'vertical',
    responsive: false,
    flexible: false,
    debug: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the spacer
          </Text>
          <Spacer {...args} />
          <Text variant="body-md" color="secondary">
            Content below the spacer - showing controlled spacing for University at Buffalo interfaces
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(E=(C=h.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var w,k,H;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📏 SIZES</Badge>
            Spacer Sizes - Precise Spacing Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 sizes from xs (4px) to 4xl (96px) for complete layout flexibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Vertical Spacing Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Spacing Examples:</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Extra Small (4px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="xs" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Small (8px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="sm" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Medium (16px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="md" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Large (24px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="lg" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Extra Large (32px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Section 1</Text>
                    <Spacer size="xl" debug />
                    <Text variant="body-xs" color="primary">Section 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">2X Large (48px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Block 1</Text>
                    <Spacer size="2xl" debug />
                    <Text variant="body-xs" color="primary">Block 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">3X Large (64px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Area 1</Text>
                    <Spacer size="3xl" debug />
                    <Text variant="body-xs" color="primary">Area 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">4X Large (96px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Region 1</Text>
                    <Spacer size="4xl" debug />
                    <Text variant="body-xs" color="primary">Region 2</Text>
                  </div>
                </div>

              </div>
            </div>

            {/* Horizontal Spacing Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Spacing Examples:</h4>
              
              <div className="space-y-4">
                
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">Item</Text>
                    <HorizontalSpacer size="xs" debug />
                    <Text variant="body-sm" color="secondary">xs</Text>
                    <HorizontalSpacer size="sm" debug />
                    <Text variant="body-sm" color="secondary">sm</Text>
                    <HorizontalSpacer size="md" debug />
                    <Text variant="body-sm" color="secondary">md</Text>
                    <HorizontalSpacer size="lg" debug />
                    <Text variant="body-sm" color="secondary">lg</Text>
                    <HorizontalSpacer size="xl" debug />
                    <Text variant="body-sm" color="secondary">xl</Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Direction Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🧭 DIRECTIONS</Badge>
            Spacing Directions - Layout Flexibility
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 direction types for complete control over spacing placement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Direction:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-sm" color="primary">Course Requirements</Text>
                <VerticalSpacer size="lg" debug />
                <Text variant="body-sm" color="secondary">Core CS Courses</Text>
                <VerticalSpacer size="md" debug />
                <Text variant="body-sm" color="secondary">Technical Electives</Text>
                <VerticalSpacer size="sm" debug />
                <Text variant="body-sm" color="muted">General Education</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Direction:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">CSE 331</Text>
                  <HorizontalSpacer size="lg" debug />
                  <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                  <HorizontalSpacer size="md" debug />
                  <Text variant="body-sm" color="secondary">4 Credits</Text>
                  <HorizontalSpacer size="sm" debug />
                  <Text variant="body-sm" color="muted">Fall 2024</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Both Directions:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">Column 1</Text>
                    <Text variant="body-xs" color="secondary">Content here</Text>
                  </div>
                  <Spacer direction="both" size="xl" debug />
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">Column 2</Text>
                    <Text variant="body-xs" color="secondary">Content here</Text>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Responsive Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📱 RESPONSIVE</Badge>
            Responsive Spacing - Device Adaptation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Automatic spacing adjustment across device breakpoints for optimal mobile experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Responsive Vertical Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-sm" color="primary">Mobile: sm → Tablet: md → Desktop: lg</Text>
                <ResponsiveSpacer size="sm" direction="vertical" debug />
                <Text variant="body-sm" color="secondary">Spacing automatically adapts to screen size</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Responsive Horizontal Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">Item 1</Text>
                  <ResponsiveSpacer size="md" direction="horizontal" debug />
                  <Text variant="body-sm" color="secondary">Item 2</Text>
                  <ResponsiveSpacer size="md" direction="horizontal" debug />
                  <Text variant="body-sm" color="muted">Item 3</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Flexible Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔄 FLEXIBLE</Badge>
            Flexible Spacing - Dynamic Growth
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Dynamic spacing that grows to fill available space for perfect layouts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Flexible Horizontal Growth:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">Left Content</Text>
                  <FlexibleSpacer direction="horizontal" debug />
                  <Text variant="body-sm" color="secondary">Right Content</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Flexible Vertical Growth:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg h-40 flex flex-col">
                <Text variant="body-sm" color="primary">Top Content</Text>
                <FlexibleSpacer direction="vertical" debug />
                <Text variant="body-sm" color="secondary">Bottom Content</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">🎯 PRESETS</Badge>
            Spacer Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built spacer components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size-Based Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-2">
                <Text variant="body-xs" color="primary">TinySpacer (xs)</Text>
                <TinySpacer debug />
                <Text variant="body-xs" color="primary">SmallSpacer (sm)</Text>
                <SmallSpacer debug />
                <Text variant="body-xs" color="primary">MediumSpacer (md)</Text>
                <MediumSpacer debug />
                <Text variant="body-xs" color="primary">LargeSpacer (lg)</Text>
                <LargeSpacer debug />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Function-Based Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-xs" color="primary">Gap.sm</Text>
                  {HorizontalGap.sm()}
                  <Text variant="body-xs" color="primary">Gap.md</Text>
                  {HorizontalGap.md()}
                  <Text variant="body-xs" color="primary">Gap.lg</Text>
                  {HorizontalGap.lg()}
                  <Text variant="body-xs" color="primary">End</Text>
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
            Real Campus Spacing Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spacer usage in actual University at Buffalo academic and administrative interfaces
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Listing */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Listing Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-md" color="primary">
                  Computer Science Courses - Fall 2024
                </Text>
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Core Requirements</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 250 - Data Structures</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 331 - Algorithm Analysis</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="ruby">Waitlist</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 410 - Software Engineering</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">3 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                </div>
                
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Technical Electives</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 442 - Software Engineering</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 460 - Machine Learning</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">3 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Student Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Sections:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-lg" color="primary">
                  Academic Dashboard
                </Text>
                <VerticalSpacer size="2xl" />
                
                {/* Quick Stats */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Academic Progress</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Text variant="display-sm" color="emerald" weight="bold">3.75</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Current GPA</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="display-sm" color="primary" weight="bold">102</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Credits Earned</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="display-sm" color="gold" weight="bold">18</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Credits Remaining</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="2xl" />
                
                {/* Current Courses */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Current Enrollment</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                      </div>
                      <Text variant="body-sm" color="emerald">A- (92%)</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">MTH 241</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">College Calculus</Text>
                      </div>
                      <Text variant="body-sm" color="primary">B+ (88%)</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">PHI 237</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">Ethics</Text>
                      </div>
                      <Text variant="body-sm" color="emerald">A (95%)</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="2xl" />
                
                {/* Upcoming Deadlines */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Upcoming Deadlines</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center">
                      <Text variant="body-sm" color="ruby" weight="medium">Tomorrow</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">CSE 331 Assignment 4</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">11:59 PM</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center">
                      <Text variant="body-sm" color="gold" weight="medium">Friday</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">MTH 241 Midterm Exam</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">2:00 PM</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center">
                      <Text variant="body-sm" color="primary" weight="medium">Next Week</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">PHI 237 Essay Draft</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">Monday</Text>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Form Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Registration Form Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-md" color="primary">
                  Course Registration - Spring 2025
                </Text>
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Student Information</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text variant="body-sm" color="secondary">Student ID: 50123456</Text>
                    </div>
                    <div>
                      <Text variant="body-sm" color="secondary">Classification: Senior</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="xl" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Course Selection</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center">
                      <Text variant="body-sm" color="primary">Course Code</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="primary">Course Title</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="primary">Credits</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center p-2 bg-[var(--hive-background-primary)] rounded">
                      <Text variant="body-sm" color="secondary">CSE 442</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="secondary">Software Engineering</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="secondary">4</Text>
                    </div>
                    <VerticalSpacer size="xs" />
                    
                    <div className="flex items-center p-2 bg-[var(--hive-background-primary)] rounded">
                      <Text variant="body-sm" color="secondary">CSE 460</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="secondary">Machine Learning</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="secondary">3</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="xl" />
                
                <div className="flex items-center justify-between">
                  <Text variant="body-sm" color="primary" weight="medium">Total Credits: 7</Text>
                  <button className="px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg">
                    Register for Courses
                  </button>
                </div>
              </div>
              
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(H=(k=g.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};var L,A,R;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    direction: 'vertical',
    responsive: false,
    flexible: false,
    debug: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Spacer Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spacer configurations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the spacer
          </Text>
          <Spacer {...args} />
          <Text variant="body-md" color="secondary">
            Content below the spacer - testing spacing for University at Buffalo interfaces
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(R=(A=b.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};const re=["Default","CompleteShowcase","Playground"];export{g as CompleteShowcase,h as Default,b as Playground,re as __namedExportsOrder,se as default};
