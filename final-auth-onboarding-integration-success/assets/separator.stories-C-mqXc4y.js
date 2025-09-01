import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as I}from"./index-DJO9vBfz.js";import{c as B}from"./utils-CytzSlOG.js";import{H as i,c as t,a as o,b as d}from"./hive-tokens-BKUtHA8Z.js";import{B as c}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const u={horizontal:{sm:"h-0.5",md:"h-0.5",lg:"h-0.75"},vertical:{sm:"w-0.5",md:"w-0.5",lg:"w-0.75"}},H={solid:"bg-[var(--hive-border-primary)]",dashed:"border-dashed border-t border-[var(--hive-border-primary)] bg-transparent",dotted:"border-dotted border-t border-[var(--hive-border-primary)] bg-transparent",gradient:"bg-gradient-to-r from-transparent via-[var(--hive-border-primary)] to-transparent"},R={none:"",sm:"my-2",md:"my-4",lg:"my-6"},O={none:"",sm:"mx-2",md:"mx-4",lg:"mx-6"},r=I.forwardRef(({orientation:s="horizontal",variant:k="solid",size:h="md",spacing:y="md",decorative:P=!1,className:A,...E},D)=>{const g=s==="horizontal",V=["flex-shrink-0",g?["w-full",u.horizontal[h]].join(" "):["h-full",u.vertical[h]].join(" "),H[k],y!=="none"&&(g?R[y]:O[y])].filter(Boolean).join(" ");return e.jsx("div",{ref:D,className:B(V,A),role:P?"none":"separator","aria-orientation":s,...E})});r.displayName="Separator";const l=s=>e.jsx(r,{orientation:"horizontal",...s}),n=s=>e.jsx(r,{orientation:"vertical",...s}),m=s=>e.jsx(r,{variant:"gradient",...s});r.__docgenInfo={description:"",methods:[],displayName:"Separator",props:{orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}]},description:"",defaultValue:{value:"'solid'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},spacing:{required:!1,tsType:{name:"union",raw:"'none' | 'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},decorative:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};l.__docgenInfo={description:"",methods:[],displayName:"HorizontalSeparator"};n.__docgenInfo={description:"",methods:[],displayName:"VerticalSeparator"};m.__docgenInfo={description:"",methods:[],displayName:"GradientDivider"};const Y={title:"01-Atoms/Separator - COMPLETE DEFINITION",component:r,parameters:{docs:{description:{component:`
## 🎯 HIVE Separator - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated separator system for University at Buffalo campus content division and visual organization.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Solid, dashed, dotted, gradient with perfect semantic token usage
- **2 Orientations** - Horizontal and vertical with intelligent sizing
- **3 Size Options** - Small, medium, large with appropriate visual weight
- **4 Spacing Options** - None, small, medium, large with consistent rhythm
- **Perfect Semantic Tokens** - 100% semantic token usage for borders
- **Smart Accessibility** - ARIA compliant with proper separator roles
- **Campus Layout Ready** - Optimized for UB content organization and visual hierarchy

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo content organization and interface structure:
- **Academic Content** - Separating course sections, assignment categories, grade breakdowns
- **Administrative Forms** - Dividing form sections, grouping related fields
- **Campus Information** - Organizing event details, department listings, news articles
- **Navigation Structure** - Separating menu sections, breadcrumb divisions
- **Data Display** - Organizing student records, course catalogs, campus directories

### 📱 **MOBILE OPTIMIZATION**
- **Visual Clarity** - Appropriate thickness and contrast for mobile screens
- **Touch Spacing** - Proper spacing for mobile content organization
- **Responsive Behavior** - Consistent appearance across device sizes
`}}},tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"Separator orientation"},variant:{control:"select",options:["solid","dashed","dotted","gradient"],description:"Visual style variant"},size:{control:"select",options:["sm","md","lg"],description:"Separator thickness"},spacing:{control:"select",options:["none","sm","md","lg"],description:"Margin spacing around separator"},decorative:{control:"boolean",description:"Whether separator is decorative only (affects ARIA)"}}},v={args:{orientation:"horizontal",variant:"solid",size:"md",spacing:"md",decorative:!1},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(i,{children:e.jsxs(t,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Course Registration for Spring 2025"}),e.jsx(r,{...s}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Available computer science courses and enrollment information for University at Buffalo students."})]})})})},p={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"success",children:"✅ ORIENTATIONS"}),"Separator Orientations - Horizontal & Vertical"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"2 orientations for flexible content organization and layout structure"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Horizontal Separators:"}),e.jsxs("div",{className:"space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Computer Science Department"}),e.jsx(l,{}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Undergraduate Programs"}),e.jsx(l,{variant:"dashed"}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Graduate Programs"}),e.jsx(l,{variant:"dotted"}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Research Opportunities"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Vertical Separators:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4 h-16",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"CSE 331"}),e.jsx(n,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Algorithm Analysis"}),e.jsx(n,{variant:"dashed"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"4 Credits"}),e.jsx(n,{variant:"dotted"}),e.jsx(a,{variant:"body-sm",color:"muted",children:"Prerequisites: CSE 250"})]})})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"info",children:"🎨 VARIANTS"}),"Separator Variants - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 visual variants using 100% semantic tokens for consistent border styling"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Solid Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Clean, definitive content division"}),e.jsx(r,{variant:"solid"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Most common separator for clear section breaks"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dashed Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Subtle content organization"}),e.jsx(r,{variant:"dashed"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Softer division for related content sections"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dotted Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Minimal visual separation"}),e.jsx(r,{variant:"dotted"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Lightest separation for subtle organization"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Gradient Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Elegant content transition"}),e.jsx(m,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Smooth visual flow between content sections"})]})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"📏 SIZES"}),"Separator Sizes - Visual Weight Options"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 sizes for different visual hierarchy and content organization needs"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Small Size (Subtle):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Light content division"}),e.jsx(r,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Minimal visual weight for subtle organization"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Medium Size (Standard):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Standard content division"}),e.jsx(r,{size:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Default size for most campus content organization"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Large Size (Prominent):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Strong content division"}),e.jsx(r,{size:"lg"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Prominent separation for major section breaks"})]})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"secondary",children:"📐 SPACING"}),"Separator Spacing - Rhythm & Flow"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 spacing options for consistent content rhythm and visual breathing room"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"No Spacing:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Tight content layout"}),e.jsx(r,{spacing:"none"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"No margin for compact organization"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Small Spacing:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Compact content layout"}),e.jsx(r,{spacing:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Minimal spacing for dense information"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Medium Spacing (Default):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Standard content layout"}),e.jsx(r,{spacing:"md"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Balanced spacing for most campus content"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Large Spacing:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Spacious content layout"}),e.jsx(r,{spacing:"lg"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Generous spacing for featured content sections"})]})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"warning",children:"🎯 PRESETS"}),"Separator Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built separator components for common campus content organization patterns"})]}),e.jsx(t,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Horizontal Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Academic Requirements"}),e.jsx(l,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Core CS courses, electives, and general education requirements"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Vertical Separator:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-3 h-12",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Fall 2024"}),e.jsx(n,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Spring 2025"}),e.jsx(n,{}),e.jsx(a,{variant:"body-sm",color:"muted",children:"Summer 2025"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Gradient Divider:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Course Description"}),e.jsx(m,{}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Prerequisites and enrollment information"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Decorative Separator:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Visual enhancement only"}),e.jsx(r,{decorative:!0}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"No semantic meaning for screen readers"})]})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Separator Usage Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Separator usage in actual University at Buffalo academic and administrative contexts"})]}),e.jsxs(t,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Catalog Organization:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-md",color:"primary",children:"CSE 331 - Algorithm Analysis and Design"}),e.jsx(r,{}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Information"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Credits: 4 • Prerequisites: CSE 250, MTH 241"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Offered: Fall, Spring • Format: Lecture + Recitation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Enrollment Details"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Available Sections: 3 • Total Capacity: 105 students"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Registration: Open to CS majors and minors"})]})]}),e.jsx(r,{variant:"dashed"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Description"}),e.jsx(a,{variant:"body-md",color:"primary",children:"This course provides an introduction to the design and analysis of algorithms. Topics include asymptotic notation, recurrence relations, basic algorithmic paradigms such as divide-and-conquer, greedy, and dynamic programming. Graph algorithms and NP-completeness are also covered."})]}),e.jsx(r,{variant:"dotted"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Learning Outcomes"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"• Analyze time and space complexity of algorithms using asymptotic notation"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"• Design efficient algorithms using divide-and-conquer, greedy, and dynamic programming approaches"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"• Implement and analyze fundamental graph algorithms"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Academic Dashboard:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Academic Progress - Fall 2024"}),e.jsx(r,{size:"lg"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"display-sm",color:"emerald",weight:"bold",children:"3.75"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Current GPA"})]}),e.jsx("div",{className:"hidden md:flex justify-center",children:e.jsx(n,{size:"lg"})}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"display-sm",color:"primary",weight:"bold",children:"102"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Credits Completed"})]}),e.jsx("div",{className:"hidden md:flex justify-center",children:e.jsx(n,{size:"lg"})}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"display-sm",color:"gold",weight:"bold",children:"18"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Credits Remaining"})]})]})]}),e.jsx(m,{}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Current Enrollment"}),e.jsx(r,{variant:"dashed"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"CSE 331"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-xs",color:"secondary",children:"Section A1"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"emerald",children:"A- (92%)"})]})]}),e.jsx(r,{spacing:"sm"}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"MTH 241"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-xs",color:"secondary",children:"Section B2"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"primary",children:"B+ (88%)"})]})]}),e.jsx(r,{spacing:"sm"}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"PHI 237"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-xs",color:"secondary",children:"Section C1"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"emerald",children:"A (95%)"})]})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Event Details:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-md",color:"primary",children:"CS Department Career Fair"}),e.jsx(r,{}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Event Details"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"📅 Wednesday, December 20, 2024"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"⏰ 10:00 AM - 4:00 PM"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"📍 Student Union Ballroom"})]})]}),e.jsx(r,{variant:"dotted",spacing:"sm"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Registration"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Free for all UB students • RSVP required"}),e.jsx(a,{variant:"body-sm",color:"emerald",children:"✓ You are registered for this event"})]})]}),e.jsx("div",{className:"hidden md:flex justify-center",children:e.jsx(n,{})}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Participating Companies"}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"Google"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"muted",children:"SWE Internships"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"Microsoft"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"muted",children:"Full-time & Internships"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"Meta"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-xs",color:"muted",children:"New Grad Positions"})]})]})]}),e.jsx(r,{variant:"dotted",spacing:"sm"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"What to Bring"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Resume copies, portfolio examples, questions about roles and company culture"})]})]})]}),e.jsx(m,{}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Important Notes"}),e.jsx(a,{variant:"body-sm",color:"primary",children:"Professional dress recommended. Career Services will be available for resume reviews and interview preparation. Parking available in Parking Lot N with validation."})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Navigation Breadcrumbs:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"HIVE"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Academics"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Computer Science"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Course Catalog"}),e.jsx(n,{size:"sm"}),e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"CSE 331"})]})})]})]})]})]})},x={args:{orientation:"horizontal",variant:"solid",size:"md",spacing:"md",decorative:!1},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsx(d,{children:"Separator Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different separator configurations"})]}),e.jsxs(t,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Content above the separator"}),e.jsx(r,{...s}),e.jsx(a,{variant:"body-md",color:"secondary",children:"Content below the separator - showing visual organization for University at Buffalo campus content."})]})]})})};var b,j,N;v.parameters={...v.parameters,docs:{...(b=v.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    spacing: 'md',
    decorative: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Course Registration for Spring 2025
          </Text>
          <Separator {...args} />
          <Text variant="body-md" color="secondary">
            Available computer science courses and enrollment information for University at Buffalo students.
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(N=(j=v.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var f,T,S;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Orientation Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ ORIENTATIONS</Badge>
            Separator Orientations - Horizontal & Vertical
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            2 orientations for flexible content organization and layout structure
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Horizontal Separators */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Separators:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-md" color="primary">
                  Computer Science Department
                </Text>
                <HorizontalSeparator />
                <Text variant="body-md" color="secondary">
                  Undergraduate Programs
                </Text>
                <HorizontalSeparator variant="dashed" />
                <Text variant="body-md" color="secondary">
                  Graduate Programs
                </Text>
                <HorizontalSeparator variant="dotted" />
                <Text variant="body-md" color="secondary">
                  Research Opportunities
                </Text>
              </div>
            </div>

            {/* Vertical Separators */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Separators:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center gap-4 h-16">
                  <Text variant="body-sm" color="primary">CSE 331</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                  <VerticalSeparator variant="dashed" />
                  <Text variant="body-sm" color="secondary">4 Credits</Text>
                  <VerticalSeparator variant="dotted" />
                  <Text variant="body-sm" color="muted">Prerequisites: CSE 250</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Separator Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants using 100% semantic tokens for consistent border styling
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Solid Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Clean, definitive content division</Text>
                <Separator variant="solid" />
                <Text variant="body-sm" color="secondary">Most common separator for clear section breaks</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dashed Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Subtle content organization</Text>
                <Separator variant="dashed" />
                <Text variant="body-sm" color="secondary">Softer division for related content sections</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dotted Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Minimal visual separation</Text>
                <Separator variant="dotted" />
                <Text variant="body-sm" color="secondary">Lightest separation for subtle organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Gradient Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Elegant content transition</Text>
                <GradientDivider />
                <Text variant="body-sm" color="secondary">Smooth visual flow between content sections</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES</Badge>
            Separator Sizes - Visual Weight Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for different visual hierarchy and content organization needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Size (Subtle):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Light content division</Text>
                <Separator size="sm" />
                <Text variant="body-sm" color="secondary">Minimal visual weight for subtle organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Size (Standard):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Standard content division</Text>
                <Separator size="md" />
                <Text variant="body-sm" color="secondary">Default size for most campus content organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Size (Prominent):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Strong content division</Text>
                <Separator size="lg" />
                <Text variant="body-sm" color="secondary">Prominent separation for major section breaks</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Spacing Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📐 SPACING</Badge>
            Separator Spacing - Rhythm & Flow
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 spacing options for consistent content rhythm and visual breathing room
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">No Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Tight content layout</Text>
                <Separator spacing="none" />
                <Text variant="body-sm" color="secondary">No margin for compact organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Compact content layout</Text>
                <Separator spacing="sm" />
                <Text variant="body-sm" color="secondary">Minimal spacing for dense information</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Spacing (Default):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Standard content layout</Text>
                <Separator spacing="md" />
                <Text variant="body-sm" color="secondary">Balanced spacing for most campus content</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Spacious content layout</Text>
                <Separator spacing="lg" />
                <Text variant="body-sm" color="secondary">Generous spacing for featured content sections</Text>
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
            Separator Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built separator components for common campus content organization patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Academic Requirements</Text>
                <HorizontalSeparator />
                <Text variant="body-sm" color="secondary">Core CS courses, electives, and general education requirements</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-3 h-12">
                  <Text variant="body-sm" color="primary">Fall 2024</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="secondary">Spring 2025</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="muted">Summer 2025</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Gradient Divider:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Course Description</Text>
                <GradientDivider />
                <Text variant="body-sm" color="secondary">Prerequisites and enrollment information</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Decorative Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Visual enhancement only</Text>
                <Separator decorative />
                <Text variant="body-sm" color="secondary">No semantic meaning for screen readers</Text>
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
            Real Campus Separator Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Separator usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Catalog */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Catalog Organization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-md" color="primary">
                  CSE 331 - Algorithm Analysis and Design
                </Text>
                <Separator />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">
                      Course Information
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Credits: 4 • Prerequisites: CSE 250, MTH 241
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Offered: Fall, Spring • Format: Lecture + Recitation
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">
                      Enrollment Details
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Available Sections: 3 • Total Capacity: 105 students
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Registration: Open to CS majors and minors
                    </Text>
                  </div>
                </div>
                
                <Separator variant="dashed" />
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">
                    Course Description
                  </Text>
                  <Text variant="body-md" color="primary">
                    This course provides an introduction to the design and analysis of algorithms. Topics include asymptotic notation, recurrence relations, basic algorithmic paradigms such as divide-and-conquer, greedy, and dynamic programming. Graph algorithms and NP-completeness are also covered.
                  </Text>
                </div>
                
                <Separator variant="dotted" />
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">
                    Learning Outcomes
                  </Text>
                  <div className="space-y-2">
                    <Text variant="body-sm" color="secondary">
                      • Analyze time and space complexity of algorithms using asymptotic notation
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      • Design efficient algorithms using divide-and-conquer, greedy, and dynamic programming approaches
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      • Implement and analyze fundamental graph algorithms
                    </Text>
                  </div>
                </div>
                
              </div>

            </div>
          </div>

          {/* Student Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Academic Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              {/* Academic Progress */}
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Academic Progress - Fall 2024
                </Text>
                <Separator size="lg" />
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="emerald" weight="bold">3.75</Text>
                    <Text variant="body-sm" color="secondary">Current GPA</Text>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <VerticalSeparator size="lg" />
                  </div>
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="primary" weight="bold">102</Text>
                    <Text variant="body-sm" color="secondary">Credits Completed</Text>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <VerticalSeparator size="lg" />
                  </div>
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="gold" weight="bold">18</Text>
                    <Text variant="body-sm" color="secondary">Credits Remaining</Text>
                  </div>
                </div>
              </div>
              
              <GradientDivider />
              
              {/* Current Courses */}
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Current Enrollment
                </Text>
                <Separator variant="dashed" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section A1</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="emerald">A- (92%)</Text>
                    </div>
                  </div>
                  <Separator spacing="sm" />
                  
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">MTH 241</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section B2</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="primary">B+ (88%)</Text>
                    </div>
                  </div>
                  <Separator spacing="sm" />
                  
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">PHI 237</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section C1</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="emerald">A (95%)</Text>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Event Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Details:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <Text as="h3" variant="heading-md" color="primary">
                CS Department Career Fair
              </Text>
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Event Details</Text>
                    <div className="space-y-1">
                      <Text variant="body-sm" color="secondary">
                        📅 Wednesday, December 20, 2024
                      </Text>
                      <Text variant="body-sm" color="secondary">
                        ⏰ 10:00 AM - 4:00 PM
                      </Text>
                      <Text variant="body-sm" color="secondary">
                        📍 Student Union Ballroom
                      </Text>
                    </div>
                  </div>
                  
                  <Separator variant="dotted" spacing="sm" />
                  
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Registration</Text>
                    <Text variant="body-sm" color="secondary">
                      Free for all UB students • RSVP required
                    </Text>
                    <Text variant="body-sm" color="emerald">
                      ✓ You are registered for this event
                    </Text>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <VerticalSeparator />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Participating Companies</Text>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Google</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">SWE Internships</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Microsoft</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">Full-time & Internships</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Meta</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">New Grad Positions</Text>
                      </div>
                    </div>
                  </div>
                  
                  <Separator variant="dotted" spacing="sm" />
                  
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">What to Bring</Text>
                    <Text variant="body-sm" color="secondary">
                      Resume copies, portfolio examples, questions about roles and company culture
                    </Text>
                  </div>
                </div>
              </div>
              
              <GradientDivider />
              
              <div className="space-y-2">
                <Text variant="body-sm" color="gold" weight="medium">Important Notes</Text>
                <Text variant="body-sm" color="primary">
                  Professional dress recommended. Career Services will be available for resume reviews and interview preparation. Parking available in Parking Lot N with validation.
                </Text>
              </div>
              
            </div>
          </div>

          {/* Navigation Breadcrumbs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Navigation Breadcrumbs:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="flex items-center gap-2 text-sm">
                <Text variant="body-sm" color="gold" weight="medium">HIVE</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Academics</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Computer Science</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Course Catalog</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
              </div>
              
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(S=(T=p.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var C,z,w;x.parameters={...x.parameters,docs:{...(C=x.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    spacing: 'md',
    decorative: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Separator Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different separator configurations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the separator
          </Text>
          <Separator {...args} />
          <Text variant="body-md" color="secondary">
            Content below the separator - showing visual organization for University at Buffalo campus content.
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(w=(z=x.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};const Z=["Default","CompleteShowcase","Playground"];export{p as CompleteShowcase,v as Default,x as Playground,Z as __namedExportsOrder,Y as default};
