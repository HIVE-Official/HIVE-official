import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as p}from"./index-DJO9vBfz.js";import{c as V}from"./index-BwobEAja.js";import{c as f}from"./utils-CytzSlOG.js";import{H as u,c as x,a as h,b}from"./hive-tokens-CKIUfcHM.js";import{B as C}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import{B as d}from"./button-ymJAW2tQ.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./loader-circle-X2oruQZf.js";import"./createLucideIcon-WpwZgzX-.js";const q=V("flex-shrink-0",{variants:{size:{xs:"w-2 h-2",sm:"w-4 h-4",default:"w-6 h-6",md:"w-8 h-8",lg:"w-12 h-12",xl:"w-16 h-16","2xl":"w-20 h-20","3xl":"w-24 h-24"},direction:{both:"",horizontal:"h-0",vertical:"w-0"}},defaultVariants:{size:"default",direction:"both"}}),J=V("w-full mx-auto",{variants:{size:{sm:"max-w-screen-sm",md:"max-w-screen-md",lg:"max-w-screen-lg",xl:"max-w-screen-xl","2xl":"max-w-screen-2xl",full:"max-w-full"},padding:{none:"",sm:"px-4",default:"px-6",lg:"px-8",xl:"px-12"},center:{true:"mx-auto",false:""}},defaultVariants:{size:"lg",padding:"default",center:!0}}),Y=V("flex",{variants:{direction:{horizontal:"flex-row",vertical:"flex-col"},spacing:{none:"",xs:"gap-2",sm:"gap-4",default:"gap-6",md:"gap-8",lg:"gap-12",xl:"gap-16","2xl":"gap-20","3xl":"gap-24"},align:{start:"items-start",center:"items-center",end:"items-end",stretch:"items-stretch",baseline:"items-baseline"},justify:{start:"justify-start",center:"justify-center",end:"justify-end",between:"justify-between",around:"justify-around",evenly:"justify-evenly"},wrap:{true:"flex-wrap",false:"flex-nowrap"}},defaultVariants:{direction:"vertical",spacing:"default",align:"stretch",justify:"start",wrap:!1}}),X=V("shrink-0",{variants:{orientation:{horizontal:"h-px w-full bg-[var(--hive-border-default)]",vertical:"w-px h-full bg-[var(--hive-border-default)]"},variant:{default:"bg-[var(--hive-border-default)]",muted:"bg-[color-mix(in_srgb,var(--hive-border-default)_50%,transparent)]",strong:"bg-[var(--hive-text-tertiary)]",brand:"bg-[var(--hive-brand-secondary)]"},size:{thin:"",default:"",thick:""}},compoundVariants:[{orientation:"horizontal",size:"thin",class:"h-px"},{orientation:"horizontal",size:"default",class:"h-0.5"},{orientation:"horizontal",size:"thick",class:"h-1"},{orientation:"vertical",size:"thin",class:"w-px"},{orientation:"vertical",size:"default",class:"w-0.5"},{orientation:"vertical",size:"thick",class:"w-1"}],defaultVariants:{orientation:"horizontal",variant:"default",size:"default"}}),H=p.forwardRef(({className:r,size:i,direction:n,...o},c)=>e.jsx("div",{ref:c,className:f(q({size:i,direction:n}),r),"aria-hidden":"true",...o}));H.displayName="Spacer";const L=p.forwardRef(({className:r,size:i,padding:n,center:o,...c},m)=>e.jsx("div",{ref:m,className:f(J({size:i,padding:n,center:o}),r),...c}));L.displayName="Container";const y=p.forwardRef(({className:r,direction:i,spacing:n,align:o,justify:c,wrap:m,children:v,...S},N)=>e.jsx("div",{ref:N,className:f(Y({direction:i,spacing:n,align:o,justify:c,wrap:m}),r),...S,children:v}));y.displayName="Stack";const l=p.forwardRef(({align:r="center",...i},n)=>e.jsx(y,{ref:n,direction:"horizontal",align:r,...i}));l.displayName="HStack";const t=p.forwardRef((r,i)=>e.jsx(y,{ref:i,direction:"vertical",...r}));t.displayName="VStack";const j=p.forwardRef(({className:r,orientation:i,variant:n,size:o,decorative:c=!0,...m},v)=>e.jsx("div",{ref:v,className:f(X({orientation:i,variant:n,size:o}),r),role:c?"none":"separator","aria-orientation":i,...m}));j.displayName="Separator";const T=p.forwardRef(({className:r,cols:i=1,gap:n="default",responsive:o=!0,...c},m)=>{const v={1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4",5:"grid-cols-5",6:"grid-cols-6",12:"grid-cols-12"},S={none:"gap-0",xs:"gap-2",sm:"gap-4",default:"gap-6",md:"gap-8",lg:"gap-12",xl:"gap-16"},N=o?{1:"grid-cols-1",2:"grid-cols-1 md:grid-cols-2",3:"grid-cols-1 md:grid-cols-2 lg:grid-cols-3",4:"grid-cols-1 md:grid-cols-2 lg:grid-cols-4",5:"grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",6:"grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",12:"grid-cols-1 md:grid-cols-6 lg:grid-cols-12"}:v;return e.jsx("div",{ref:m,className:f("grid",o?N[i]:v[i],S[n],r),...c})});T.displayName="Grid";const P=p.forwardRef(({className:r,direction:i="row",wrap:n=!1,align:o="start",justify:c="start",gap:m="none",...v},S)=>{const N={row:"flex-row",col:"flex-col","row-reverse":"flex-row-reverse","col-reverse":"flex-col-reverse"},M={start:"items-start",center:"items-center",end:"items-end",stretch:"items-stretch",baseline:"items-baseline"},U={start:"justify-start",center:"justify-center",end:"justify-end",between:"justify-between",around:"justify-around",evenly:"justify-evenly"},_={none:"",xs:"gap-2",sm:"gap-4",default:"gap-6",md:"gap-8",lg:"gap-12",xl:"gap-16"};return e.jsx("div",{ref:S,className:f("flex",N[i],n&&"flex-wrap",M[o],U[c],_[m],r),...v})});P.displayName="Flex";const g={PageLayout:({children:r,...i})=>e.jsx(L,{size:"xl",padding:"lg",...i,children:e.jsx(t,{spacing:"xl",children:r})}),FormLayout:({children:r,...i})=>e.jsx(t,{spacing:"lg",...i,children:r}),HeaderLayout:({children:r,...i})=>e.jsx(l,{justify:"between",align:"center",...i,children:r})};H.__docgenInfo={description:"",methods:[],displayName:"Spacer",composes:["VariantProps"]};L.__docgenInfo={description:"",methods:[],displayName:"Container",composes:["VariantProps"]};y.__docgenInfo={description:"",methods:[],displayName:"Stack",composes:["VariantProps"]};l.__docgenInfo={description:"",methods:[],displayName:"HStack",props:{align:{defaultValue:{value:'"center"',computed:!1},required:!1}},composes:["Omit"]};t.__docgenInfo={description:"",methods:[],displayName:"VStack",composes:["Omit"]};j.__docgenInfo={description:"",methods:[],displayName:"Separator",props:{decorative:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["VariantProps"]};T.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{cols:{required:!1,tsType:{name:"union",raw:"1 | 2 | 3 | 4 | 5 | 6 | 12",elements:[{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"12"}]},description:"",defaultValue:{value:"1",computed:!1}},gap:{required:!1,tsType:{name:"union",raw:'"none" | "xs" | "sm" | "default" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"default"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},responsive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};P.__docgenInfo={description:"",methods:[],displayName:"Flex",props:{direction:{required:!1,tsType:{name:"union",raw:'"row" | "col" | "row-reverse" | "col-reverse"',elements:[{name:"literal",value:'"row"'},{name:"literal",value:'"col"'},{name:"literal",value:'"row-reverse"'},{name:"literal",value:'"col-reverse"'}]},description:"",defaultValue:{value:'"row"',computed:!1}},wrap:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},align:{required:!1,tsType:{name:"union",raw:'"start" | "center" | "end" | "stretch" | "baseline"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"center"'},{name:"literal",value:'"end"'},{name:"literal",value:'"stretch"'},{name:"literal",value:'"baseline"'}]},description:"",defaultValue:{value:'"start"',computed:!1}},justify:{required:!1,tsType:{name:"union",raw:'"start" | "center" | "end" | "between" | "around" | "evenly"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"center"'},{name:"literal",value:'"end"'},{name:"literal",value:'"between"'},{name:"literal",value:'"around"'},{name:"literal",value:'"evenly"'}]},description:"",defaultValue:{value:'"start"',computed:!1}},gap:{required:!1,tsType:{name:"union",raw:'"none" | "xs" | "sm" | "default" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"default"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"none"',computed:!1}}}};const de={title:"01-Atoms/Spacing Enhanced - COMPLETE DEFINITION",component:y,parameters:{docs:{description:{component:`
## 📐 HIVE Spacing Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive spacing and layout system for University at Buffalo HIVE platform interface organization and structure.

### 🎯 **COMPONENT EXCELLENCE**
- **8 Layout Components** - Spacer, Container, Stack, HStack, VStack, Separator, Grid, Flex for complete layout control
- **Responsive Design** - Adaptive sizing and breakpoint-aware layouts for all screen sizes
- **Perfect Semantic Tokens** - 100% semantic token usage for all spacing, colors, and borders
- **Layout Presets** - Pre-configured common layout patterns for rapid development
- **Flexible Spacing** - 8 size options from XS to 3XL for precise spacing control
- **Advanced Grid System** - Responsive grid with breakpoint management and gap control
- **Stack System** - Horizontal and vertical stacks with alignment and distribution options
- **Accessibility Ready** - Proper ARIA labels, semantic structure, and screen reader support
- **Campus Interface** - Built for University at Buffalo platform layout consistency

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform layout and organization:
- **Page Layouts** - Consistent page structure for course spaces, profiles, and tools
- **Content Organization** - Stack systems for organizing academic content and social features
- **Responsive Grids** - Course lists, space directories, tool galleries, and event displays
- **Interface Separation** - Clear visual separation between platform sections and features
- **Form Layouts** - Consistent spacing for registration, settings, and tool creation forms
- **Dashboard Organization** - Structured layouts for student analytics and activity tracking

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Breakpoints** - Adaptive layouts from mobile to desktop
- **Touch-Friendly Spacing** - Appropriate spacing for mobile interaction
- **Flexible Containers** - Adaptive containers for different screen sizes
- **Mobile-First Design** - Optimized spacing hierarchy for mobile experiences
`}}},tags:["autodocs"],argTypes:{direction:{control:"select",options:["horizontal","vertical"],description:"Stack direction"},spacing:{control:"select",options:["none","xs","sm","default","md","lg","xl","2xl","3xl"],description:"Stack spacing size"},align:{control:"select",options:["start","center","end","stretch","baseline"],description:"Cross-axis alignment"},justify:{control:"select",options:["start","center","end","between","around","evenly"],description:"Main-axis distribution"}}},s=({children:r,...i})=>e.jsx("div",{className:"p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg",...i,children:r}),k={args:{direction:"vertical",spacing:"default",align:"stretch",justify:"start"},render:r=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(u,{children:e.jsxs(x,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"HIVE spacing and layout system for University at Buffalo platform organization:"}),e.jsxs(y,{...r,children:[e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"First item in stack"})}),e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"Second item in stack"})}),e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"Third item in stack"})})]}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Flexible spacing system for consistent platform layout"})]})})})},w={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsxs(b,{className:"flex items-center gap-3",children:[e.jsx(C,{variant:"success",children:"📐 SPACING COMPONENTS"}),"Layout Component System"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive spacing and layout components for University at Buffalo HIVE platform interface organization"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Core Layout Components:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Spacer Component:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded",children:"Item 1"}),e.jsx(H,{size:"lg",direction:"horizontal"}),e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded",children:"Item 2"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Flexible spacer for precise spacing control between elements"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Container Component:"}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(L,{size:"md",padding:"lg",children:e.jsx("div",{className:"p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg text-center",children:e.jsx(a,{variant:"body-sm",children:"Container content with max-width and padding"})})}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"p-2",children:"Responsive container with size constraints and padding options"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Separator Component:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",children:"Content above separator"}),e.jsx(j,{className:"my-4"}),e.jsx(a,{variant:"body-sm",children:"Content below separator"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Visual separation between content sections"})]})]})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsxs(b,{className:"flex items-center gap-3",children:[e.jsx(C,{variant:"info",children:"📚 STACK SYSTEM"}),"Horizontal and Vertical Stacks"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Flexible stack components for organizing content with proper spacing and alignment"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Stack Directions:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Vertical Stack (VStack):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(t,{spacing:"sm",children:[e.jsx(s,{children:"Course Space: CSE 331"}),e.jsx(s,{children:"Assignment: Algorithm Analysis"}),e.jsx(s,{children:"Due Date: Next Tuesday"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Vertical organization for course content and academic information"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Horizontal Stack (HStack):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(l,{spacing:"sm",align:"center",children:[e.jsx(d,{size:"sm",children:"Join Space"}),e.jsx(d,{variant:"secondary",size:"sm",children:"View Details"}),e.jsx(d,{variant:"ghost",size:"sm",children:"Share"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Horizontal arrangement for action buttons and navigation elements"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Stack Spacing Options:"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",color:"secondary",className:"mb-2",children:"Small Spacing:"}),e.jsxs(t,{spacing:"xs",children:[e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"}),e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"}),e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"})]})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-xs",color:"secondary",className:"mb-2",children:"Large Spacing:"}),e.jsxs(t,{spacing:"lg",children:[e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"}),e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"}),e.jsx("div",{className:"p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs",children:"Item"})]})]})]})]})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsxs(b,{className:"flex items-center gap-3",children:[e.jsx(C,{variant:"primary",children:"⚡ ADVANCED LAYOUTS"}),"Grid and Flex Systems"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced layout systems for complex interface organization and responsive design"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Grid System:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Responsive Grid (3 columns):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(T,{cols:3,gap:"md",responsive:!0,children:[e.jsx(s,{children:"Space Card 1"}),e.jsx(s,{children:"Space Card 2"}),e.jsx(s,{children:"Space Card 3"}),e.jsx(s,{children:"Space Card 4"}),e.jsx(s,{children:"Space Card 5"}),e.jsx(s,{children:"Space Card 6"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Responsive grid layout for space directory and course listings"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Flex Layout:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(P,{justify:"between",align:"center",gap:"sm",children:[e.jsx(s,{children:"Profile Info"}),e.jsx(s,{children:"Statistics"}),e.jsx(s,{children:"Actions"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Flexible layout with space distribution for profile headers and navigation"})]})]})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsxs(b,{className:"flex items-center gap-3",children:[e.jsx(C,{variant:"secondary",children:"🎨 LAYOUT PRESETS"}),"Pre-configured Layout Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Common layout patterns optimized for University at Buffalo platform interface consistency"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Common Layout Patterns:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Page Layout:"}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(g.PageLayout,{children:[e.jsx(s,{children:"Page Header"}),e.jsx(s,{children:"Main Content"}),e.jsx(s,{children:"Footer"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"p-2",children:"Standard page layout with container and vertical spacing"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Header Layout:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(g.HeaderLayout,{children:[e.jsx(s,{children:"Page Title"}),e.jsx(s,{children:"Actions"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Header layout with title and action buttons distributed across space"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Form Layout:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(g.FormLayout,{children:[e.jsx(s,{children:"Form Field 1"}),e.jsx(s,{children:"Form Field 2"}),e.jsx(s,{children:"Submit Button"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Form layout with consistent spacing for registration and settings forms"})]})]})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsxs(b,{className:"flex items-center gap-3",children:[e.jsx(C,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Layout Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Spacing and layout usage in actual University at Buffalo student interface and platform organization contexts"})]}),e.jsxs(x,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE 331 Course Space Layout:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Algorithm Analysis Course Organization"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(g.PageLayout,{children:[e.jsx("div",{className:"p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg",children:e.jsxs(g.HeaderLayout,{children:[e.jsxs(t,{spacing:"xs",children:[e.jsx(a,{variant:"heading-md",color:"primary",children:"CSE 331 - Algorithm Analysis"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Fall 2024 • Dr. Emily Rodriguez"})]}),e.jsxs(l,{spacing:"sm",children:[e.jsx(d,{size:"sm",children:"Join Space"}),e.jsx(d,{variant:"secondary",size:"sm",children:"Syllabus"})]})]})}),e.jsx(j,{}),e.jsxs(T,{cols:3,gap:"md",responsive:!0,children:[e.jsx("div",{className:"p-4 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsxs(t,{spacing:"sm",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Recent Assignments"}),e.jsxs(t,{spacing:"xs",children:[e.jsx(a,{variant:"body-xs",children:"Dynamic Programming - Due Mon"}),e.jsx(a,{variant:"body-xs",children:"Graph Algorithms - Due Wed"}),e.jsx(a,{variant:"body-xs",children:"Final Project - Due Dec 15"})]})]})}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsxs(t,{spacing:"sm",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Study Groups"}),e.jsxs(t,{spacing:"xs",children:[e.jsx(a,{variant:"body-xs",children:"Algorithms Study Group"}),e.jsx(a,{variant:"body-xs",children:"Project Team Alpha"}),e.jsx(a,{variant:"body-xs",children:"Exam Prep Group"})]})]})}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsxs(t,{spacing:"sm",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Resources"}),e.jsxs(t,{spacing:"xs",children:[e.jsx(a,{variant:"body-xs",children:"Lecture Notes"}),e.jsx(a,{variant:"body-xs",children:"Practice Problems"}),e.jsx(a,{variant:"body-xs",children:"Reference Materials"})]})]})})]})]}),e.jsx(a,{variant:"body-sm",color:"secondary",className:"mt-4",children:"Complete course space layout using HIVE spacing system for academic content organization"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Dashboard Organization:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs(t,{spacing:"lg",children:[e.jsxs(g.HeaderLayout,{children:[e.jsxs(t,{spacing:"xs",children:[e.jsx(a,{variant:"heading-lg",color:"primary",children:"Sarah Chen's Dashboard"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Computer Science Senior • Fall 2024"})]}),e.jsxs(l,{spacing:"sm",children:[e.jsx(d,{size:"sm",variant:"secondary",children:"Profile"}),e.jsx(d,{size:"sm",children:"Settings"})]})]}),e.jsx(j,{variant:"muted"}),e.jsxs(T,{cols:2,gap:"lg",responsive:!0,children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",weight:"medium",children:"Quick Actions"}),e.jsxs(t,{spacing:"sm",children:[e.jsx("div",{className:"p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg",children:e.jsxs(l,{justify:"between",align:"center",children:[e.jsx(a,{variant:"body-sm",children:"Check Assignments"}),e.jsx(d,{size:"xs",children:"Go"})]})}),e.jsx("div",{className:"p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg",children:e.jsxs(l,{justify:"between",align:"center",children:[e.jsx(a,{variant:"body-sm",children:"Join Study Group"}),e.jsx(d,{size:"xs",children:"Go"})]})}),e.jsx("div",{className:"p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg",children:e.jsxs(l,{justify:"between",align:"center",children:[e.jsx(a,{variant:"body-sm",children:"View Calendar"}),e.jsx(d,{size:"xs",children:"Go"})]})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",weight:"medium",children:"Recent Activity"}),e.jsxs(t,{spacing:"sm",children:[e.jsx("div",{className:"p-3 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsx(a,{variant:"body-xs",children:"Joined CSE 331 study group"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsx(a,{variant:"body-xs",children:"Submitted algorithm assignment"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsx(a,{variant:"body-xs",children:"Created project planning tool"})})]})]})]})]}),e.jsx(a,{variant:"body-sm",color:"secondary",className:"mt-4",children:"Student dashboard layout showcasing hierarchical spacing and responsive grid organization"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Layout Optimization:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Mobile-optimized spacing for campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Mobile Navigation Layout:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm",children:[e.jsxs(t,{spacing:"sm",children:[e.jsxs(g.HeaderLayout,{children:[e.jsx(a,{variant:"body-md",weight:"medium",children:"HIVE"}),e.jsx(d,{size:"sm",variant:"ghost",children:"Menu"})]}),e.jsx(j,{}),e.jsxs(t,{spacing:"xs",children:[e.jsx("div",{className:"w-full p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg",children:e.jsx(a,{variant:"body-sm",children:"Feed"})}),e.jsx("div",{className:"w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsx(a,{variant:"body-sm",children:"Spaces"})}),e.jsx("div",{className:"w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsx(a,{variant:"body-sm",children:"Calendar"})})]})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Mobile navigation with touch-friendly spacing"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Mobile Content Cards:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm",children:[e.jsxs(t,{spacing:"md",children:[e.jsx("div",{className:"w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsxs(t,{spacing:"sm",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"CSE 331 Assignment"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Due: Next Tuesday"}),e.jsxs(l,{spacing:"xs",justify:"end",children:[e.jsx(d,{size:"xs",children:"View"}),e.jsx(d,{size:"xs",variant:"secondary",children:"Submit"})]})]})}),e.jsx("div",{className:"w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg",children:e.jsxs(t,{spacing:"sm",children:[e.jsx(a,{variant:"body-sm",weight:"medium",children:"Study Group Meeting"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Today at 3pm"}),e.jsxs(l,{spacing:"xs",justify:"end",children:[e.jsx(d,{size:"xs",children:"Join"}),e.jsx(d,{size:"xs",variant:"secondary",children:"Details"})]})]})})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-2",children:"Mobile-optimized card layouts with appropriate spacing for thumb interaction"})]})]})]})]})]})]})]})]})},z={args:{direction:"vertical",spacing:"default",align:"stretch",justify:"start"},render:r=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(u,{children:[e.jsxs(h,{children:[e.jsx(b,{children:"Spacing Enhanced Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different spacing configurations"})]}),e.jsx(x,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs(y,{...r,children:[e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"First item - adjust spacing and alignment"})}),e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"Second item - testing layout behavior"})}),e.jsx(s,{children:e.jsx(a,{variant:"body-sm",children:"Third item - University at Buffalo spacing system"})})]}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive spacing system testing for University at Buffalo HIVE platform layout consistency"})]})})]})})};var B,A,F;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    direction: 'vertical',
    spacing: 'default',
    align: 'stretch',
    justify: 'start'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE spacing and layout system for University at Buffalo platform organization:
          </Text>
          <Stack {...args}>
            <SampleCard>
              <Text variant="body-sm">First item in stack</Text>
            </SampleCard>
            <SampleCard>
              <Text variant="body-sm">Second item in stack</Text>
            </SampleCard>
            <SampleCard>
              <Text variant="body-sm">Third item in stack</Text>
            </SampleCard>
          </Stack>
          <Text variant="body-sm" color="secondary">
            Flexible spacing system for consistent platform layout
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(F=(A=k.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var I,E,D;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Spacing Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📐 SPACING COMPONENTS</Badge>
            Layout Component System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive spacing and layout components for University at Buffalo HIVE platform interface organization
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Layout Components:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Spacer Component:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="flex items-center">
                      <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded">Item 1</div>
                      <Spacer size="lg" direction="horizontal" />
                      <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded">Item 2</div>
                    </div>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Flexible spacer for precise spacing control between elements
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Container Component:</Text>
                  <div className="bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Container size="md" padding="lg">
                      <div className="p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg text-center">
                        <Text variant="body-sm">Container content with max-width and padding</Text>
                      </div>
                    </Container>
                    <Text variant="body-xs" color="secondary" className="p-2">
                      Responsive container with size constraints and padding options
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Separator Component:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div>
                      <Text variant="body-sm">Content above separator</Text>
                      <Separator className="my-4" />
                      <Text variant="body-sm">Content below separator</Text>
                    </div>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Visual separation between content sections
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Stack System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📚 STACK SYSTEM</Badge>
            Horizontal and Vertical Stacks
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Flexible stack components for organizing content with proper spacing and alignment
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Stack Directions:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Vertical Stack (VStack):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <VStack spacing="sm">
                      <SampleCard>Course Space: CSE 331</SampleCard>
                      <SampleCard>Assignment: Algorithm Analysis</SampleCard>
                      <SampleCard>Due Date: Next Tuesday</SampleCard>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Vertical organization for course content and academic information
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Horizontal Stack (HStack):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <HStack spacing="sm" align="center">
                      <Button size="sm">Join Space</Button>
                      <Button variant="secondary" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Share</Button>
                    </HStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Horizontal arrangement for action buttons and navigation elements
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Stack Spacing Options:</Text>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" color="secondary" className="mb-2">Small Spacing:</Text>
                      <VStack spacing="xs">
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                      </VStack>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" color="secondary" className="mb-2">Large Spacing:</Text>
                      <VStack spacing="lg">
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                      </VStack>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Grid and Flex Systems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ ADVANCED LAYOUTS</Badge>
            Grid and Flex Systems
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced layout systems for complex interface organization and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Grid System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Responsive Grid (3 columns):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Grid cols={3} gap="md" responsive>
                      <SampleCard>Space Card 1</SampleCard>
                      <SampleCard>Space Card 2</SampleCard>
                      <SampleCard>Space Card 3</SampleCard>
                      <SampleCard>Space Card 4</SampleCard>
                      <SampleCard>Space Card 5</SampleCard>
                      <SampleCard>Space Card 6</SampleCard>
                    </Grid>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Responsive grid layout for space directory and course listings
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Flex Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Flex justify="between" align="center" gap="sm">
                      <SampleCard>Profile Info</SampleCard>
                      <SampleCard>Statistics</SampleCard>
                      <SampleCard>Actions</SampleCard>
                    </Flex>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Flexible layout with space distribution for profile headers and navigation
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Layout Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎨 LAYOUT PRESETS</Badge>
            Pre-configured Layout Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Common layout patterns optimized for University at Buffalo platform interface consistency
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Layout Patterns:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Page Layout:</Text>
                  <div className="bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.PageLayout>
                      <SampleCard>Page Header</SampleCard>
                      <SampleCard>Main Content</SampleCard>
                      <SampleCard>Footer</SampleCard>
                    </LayoutPresets.PageLayout>
                    <Text variant="body-xs" color="secondary" className="p-2">
                      Standard page layout with container and vertical spacing
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Header Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.HeaderLayout>
                      <SampleCard>Page Title</SampleCard>
                      <SampleCard>Actions</SampleCard>
                    </LayoutPresets.HeaderLayout>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Header layout with title and action buttons distributed across space
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Form Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.FormLayout>
                      <SampleCard>Form Field 1</SampleCard>
                      <SampleCard>Form Field 2</SampleCard>
                      <SampleCard>Submit Button</SampleCard>
                    </LayoutPresets.FormLayout>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Form layout with consistent spacing for registration and settings forms
                    </Text>
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
            Real Campus Layout Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spacing and layout usage in actual University at Buffalo student interface and platform organization contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Space Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Course Space Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Algorithm Analysis Course Organization
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                  <LayoutPresets.PageLayout>
                    
                    {/* Course Header */}
                    <div className="p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                      <LayoutPresets.HeaderLayout>
                        <VStack spacing="xs">
                          <Text variant="heading-md" color="primary">CSE 331 - Algorithm Analysis</Text>
                          <Text variant="body-sm" color="secondary">Fall 2024 • Dr. Emily Rodriguez</Text>
                        </VStack>
                        <HStack spacing="sm">
                          <Button size="sm">Join Space</Button>
                          <Button variant="secondary" size="sm">Syllabus</Button>
                        </HStack>
                      </LayoutPresets.HeaderLayout>
                    </div>

                    <Separator />

                    {/* Course Content Grid */}
                    <Grid cols={3} gap="md" responsive>
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Recent Assignments</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Dynamic Programming - Due Mon</Text>
                            <Text variant="body-xs">Graph Algorithms - Due Wed</Text>
                            <Text variant="body-xs">Final Project - Due Dec 15</Text>
                          </VStack>
                        </VStack>
                      </div>
                      
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Study Groups</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Algorithms Study Group</Text>
                            <Text variant="body-xs">Project Team Alpha</Text>
                            <Text variant="body-xs">Exam Prep Group</Text>
                          </VStack>
                        </VStack>
                      </div>
                      
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Resources</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Lecture Notes</Text>
                            <Text variant="body-xs">Practice Problems</Text>
                            <Text variant="body-xs">Reference Materials</Text>
                          </VStack>
                        </VStack>
                      </div>
                    </Grid>

                  </LayoutPresets.PageLayout>
                  
                  <Text variant="body-sm" color="secondary" className="mt-4">
                    Complete course space layout using HIVE spacing system for academic content organization
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Student Dashboard Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Organization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                <VStack spacing="lg">
                  
                  {/* Dashboard Header */}
                  <LayoutPresets.HeaderLayout>
                    <VStack spacing="xs">
                      <Text variant="heading-lg" color="primary">Sarah Chen's Dashboard</Text>
                      <Text variant="body-sm" color="secondary">Computer Science Senior • Fall 2024</Text>
                    </VStack>
                    <HStack spacing="sm">
                      <Button size="sm" variant="secondary">Profile</Button>
                      <Button size="sm">Settings</Button>
                    </HStack>
                  </LayoutPresets.HeaderLayout>

                  <Separator variant="muted" />

                  {/* Dashboard Content */}
                  <Grid cols={2} gap="lg" responsive>
                    
                    <div className="space-y-4">
                      <Text variant="body-md" weight="medium">Quick Actions</Text>
                      <VStack spacing="sm">
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">Check Assignments</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">Join Study Group</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">View Calendar</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                      </VStack>
                    </div>

                    <div className="space-y-4">
                      <Text variant="body-md" weight="medium">Recent Activity</Text>
                      <VStack spacing="sm">
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Joined CSE 331 study group</Text>
                        </div>
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Submitted algorithm assignment</Text>
                        </div>
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Created project planning tool</Text>
                        </div>
                      </VStack>
                    </div>

                  </Grid>

                </VStack>
                
                <Text variant="body-sm" color="secondary" className="mt-4">
                  Student dashboard layout showcasing hierarchical spacing and responsive grid organization
                </Text>
              </div>

            </div>
          </div>

          {/* Mobile Layout Optimization */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Layout Optimization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized spacing for campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Navigation Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm">
                    <VStack spacing="sm">
                      <LayoutPresets.HeaderLayout>
                        <Text variant="body-md" weight="medium">HIVE</Text>
                        <Button size="sm" variant="ghost">Menu</Button>
                      </LayoutPresets.HeaderLayout>
                      
                      <Separator />
                      
                      <VStack spacing="xs">
                        <div className="w-full p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <Text variant="body-sm">Feed</Text>
                        </div>
                        <div className="w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-sm">Spaces</Text>
                        </div>
                        <div className="w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-sm">Calendar</Text>
                        </div>
                      </VStack>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Mobile navigation with touch-friendly spacing
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Content Cards:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm">
                    <VStack spacing="md">
                      <div className="w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">CSE 331 Assignment</Text>
                          <Text variant="body-xs" color="secondary">Due: Next Tuesday</Text>
                          <HStack spacing="xs" justify="end">
                            <Button size="xs">View</Button>
                            <Button size="xs" variant="secondary">Submit</Button>
                          </HStack>
                        </VStack>
                      </div>
                      
                      <div className="w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Study Group Meeting</Text>
                          <Text variant="body-xs" color="secondary">Today at 3pm</Text>
                          <HStack spacing="xs" justify="end">
                            <Button size="xs">Join</Button>
                            <Button size="xs" variant="secondary">Details</Button>
                          </HStack>
                        </VStack>
                      </div>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Mobile-optimized card layouts with appropriate spacing for thumb interaction
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(D=(E=w.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var G,R,O;z.parameters={...z.parameters,docs:{...(G=z.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    direction: 'vertical',
    spacing: 'default',
    align: 'stretch',
    justify: 'start'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Spacing Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spacing configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Stack {...args}>
              <SampleCard>
                <Text variant="body-sm">First item - adjust spacing and alignment</Text>
              </SampleCard>
              <SampleCard>
                <Text variant="body-sm">Second item - testing layout behavior</Text>
              </SampleCard>
              <SampleCard>
                <Text variant="body-sm">Third item - University at Buffalo spacing system</Text>
              </SampleCard>
            </Stack>
            <Text variant="body-sm" color="secondary">
              Interactive spacing system testing for University at Buffalo HIVE platform layout consistency
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(O=(R=z.parameters)==null?void 0:R.docs)==null?void 0:O.source}}};const ne=["Default","CompleteShowcase","Playground"];export{w as CompleteShowcase,k as Default,z as Playground,ne as __namedExportsOrder,de as default};
