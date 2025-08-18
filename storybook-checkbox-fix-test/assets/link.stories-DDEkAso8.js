import{j as e}from"./jsx-runtime-B9GTzLod.js";import{L as i}from"./link-BDemWclF.js";import{H as s,c as r,a as d,b as t}from"./hive-card-DIMxrd4t.js";import{B as n}from"./badge-BLajwy0n.js";import{T as a}from"./text-BOe2XosQ.js";import{I as m}from"./icon-Dbu8QsQ1.js";/* empty css                    */import{M as N}from"./mail-DQ8H9hI8.js";import{P as k}from"./phone-XwiNFZku.js";import{G as L}from"./globe-nBk3QZSs.js";import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./createLucideIcon-DtX30ipI.js";const V={title:"01-Atoms/Link - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
## 🎯 HIVE Link - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated link system for University at Buffalo campus navigation and external resource access.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Default, ghost, underline, button for different link contexts
- **3 Size Options** - Small, medium, large for flexible typography integration
- **4 Semantic Colors** - Primary, secondary, gold, muted for consistent brand expression
- **External Link Support** - Automatic external link indicators and security attributes
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Smart Accessibility** - Proper ARIA attributes, focus states, and screen reader support
- **Campus Navigation Ready** - Optimized for UB internal and external link patterns

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo navigation and resource linking:
- **Academic Links** - Course catalogs, enrollment systems, academic calendars
- **Campus Services** - Dining, housing, library, recreation, transportation
- **Administrative Resources** - Student services, financial aid, registrar, career center
- **External Partners** - Academic databases, research tools, partner institutions
- **Social Features** - Profile links, messaging, group coordination
- **Mobile Navigation** - Touch-friendly links for mobile campus access

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Appropriate target sizes for mobile interaction
- **Clear Visual Feedback** - Distinct hover and active states for mobile browsers
- **Accessible Focus** - Keyboard navigation support with visible focus indicators
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","ghost","underline","button"],description:"Link visual variant"},size:{control:"select",options:["sm","md","lg"],description:"Link size"},color:{control:"select",options:["primary","secondary","gold","muted"],description:"Link color using semantic tokens"},external:{control:"boolean",description:"External link with indicator"},disabled:{control:"boolean",description:"Disabled state"},href:{control:"text",description:"Link destination URL"}}},c={args:{variant:"default",size:"md",external:!1,disabled:!1,href:"https://buffalo.edu",children:"University at Buffalo"},render:h=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(s,{children:e.jsxs(r,{className:"space-y-4",children:[e.jsxs(a,{variant:"body-md",color:"primary",children:["Visit the official"," ",e.jsx(i,{...h})," ","website for more information."]}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Default link styling for University at Buffalo navigation"})]})})})},l={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"success",children:"🎭 VARIANTS"}),"Link Variants - Navigation Styles"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 visual variants for different link contexts and user interface patterns"})]}),e.jsx(r,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Default Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Standard Links:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{variant:"default",href:"https://buffalo.edu",children:"University at Buffalo Homepage"})}),e.jsx("div",{children:e.jsx(i,{variant:"default",href:"https://registrar.buffalo.edu",children:"Academic Records"})}),e.jsx("div",{children:e.jsx(i,{variant:"default",href:"https://buffalo.edu/campus-life",children:"Campus Life"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"With External Indicators:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{variant:"default",href:"https://scholar.google.com",external:!0,children:"Google Scholar"})}),e.jsx("div",{children:e.jsx(i,{variant:"default",href:"https://github.com",external:!0,children:"GitHub"})})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Ghost Variant:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Subtle Navigation:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{variant:"ghost",href:"/courses",children:"Browse Courses"})}),e.jsx("div",{children:e.jsx(i,{variant:"ghost",href:"/schedule",children:"My Schedule"})}),e.jsx("div",{children:e.jsx(i,{variant:"ghost",href:"/grades",children:"View Grades"})})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Underline Variant:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Inline Text Links:"}),e.jsxs(a,{variant:"body-md",color:"primary",children:["Students can access their academic records through the"," ",e.jsx(i,{variant:"underline",href:"/student-portal",children:"Student Portal"})," ","or contact the"," ",e.jsx(i,{variant:"underline",href:"/registrar",children:"Office of the Registrar"})," ","for assistance with enrollment questions."]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Button Variant:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Call-to-Action Links:"}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(i,{variant:"button",href:"/register",children:"Register for Courses"}),e.jsx(i,{variant:"button",href:"/apply",children:"Apply Now"}),e.jsx(i,{variant:"button",href:"/visit",children:"Schedule Campus Visit"})]})]})})]})]})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"info",children:"📏 SIZES"}),"Link Sizes - Typography Integration"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 sizes for seamless integration with different text contexts and hierarchy levels"})]}),e.jsx(r,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (sm):"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(a,{variant:"body-sm",color:"primary",children:["See"," ",e.jsx(i,{size:"sm",href:"/terms",children:"Terms of Service"})," ","for details."]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(i,{size:"sm",variant:"button",href:"/help",children:"Help"}),e.jsx(i,{size:"sm",variant:"ghost",href:"/support",children:"Support"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (md - default):"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(a,{variant:"body-md",color:"primary",children:["Access your"," ",e.jsx(i,{size:"md",href:"/dashboard",children:"Academic Dashboard"})," ","here."]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(i,{size:"md",variant:"button",href:"/courses",children:"Browse Courses"}),e.jsx(i,{size:"md",variant:"ghost",href:"/calendar",children:"View Calendar"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (lg):"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(a,{variant:"body-lg",color:"primary",children:["Welcome to"," ",e.jsx(i,{size:"lg",href:"/",children:"HIVE"})," ","at University at Buffalo."]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(i,{size:"lg",variant:"button",href:"/get-started",children:"Get Started"}),e.jsx(i,{size:"lg",variant:"ghost",href:"/learn-more",children:"Learn More"})]})]})]})]})]})})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"primary",children:"🎨 COLORS"}),"Link Colors - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 semantic colors for consistent brand expression and visual hierarchy"})]}),e.jsx(r,{children:e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Text Hierarchy Colors:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Primary:"}),e.jsx(i,{color:"primary",href:"/academics",children:"Academic Programs"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Secondary:"}),e.jsx(i,{color:"secondary",href:"/resources",children:"Additional Resources"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Muted:"}),e.jsx(i,{color:"muted",href:"/archive",children:"Archived Content"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Brand Colors:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Gold (HIVE Brand):"}),e.jsx(i,{color:"gold",href:"/featured",children:"Featured Content"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Button Variants:"}),e.jsx("div",{className:"flex gap-2",children:e.jsx(i,{variant:"button",color:"primary",href:"/action",children:"Primary Action"})})]})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"🔗 EXTERNAL"}),"External Links - Security & Indicators"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Automatic external link handling with security attributes and visual indicators"})]}),e.jsx(r,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"External Link Examples:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Resources:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"https://scholar.google.com",external:!0,children:"Google Scholar"})}),e.jsx("div",{children:e.jsx(i,{href:"https://pubmed.ncbi.nlm.nih.gov",external:!0,children:"PubMed"})}),e.jsx("div",{children:e.jsx(i,{href:"https://www.jstor.org",external:!0,children:"JSTOR"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"University Partners:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"https://www.suny.edu",external:!0,children:"SUNY System"})}),e.jsx("div",{children:e.jsx(i,{href:"https://www.aau.edu",external:!0,children:"Association of American Universities"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Student Tools:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"https://github.com",external:!0,children:"GitHub"})}),e.jsx("div",{children:e.jsx(i,{href:"https://stackoverflow.com",external:!0,children:"Stack Overflow"})}),e.jsx("div",{children:e.jsx(i,{href:"https://linkedin.com",external:!0,children:"LinkedIn"})})]})]})]})]})})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"warning",children:"⚡ STATES"}),"Link States - Interactive Feedback"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Complete interactive state system for accessible and responsive link behavior"})]}),e.jsx(r,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive States:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Normal State:"}),e.jsx(i,{href:"/normal",children:"Standard Link Appearance"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Hover State (hover over links):"}),e.jsx(i,{href:"/hover",children:"Hover for Color Change"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Focus State (tab to focus):"}),e.jsx(i,{href:"/focus",children:"Tab to See Focus Ring"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Disabled State:"}),e.jsx(i,{disabled:!0,children:"Disabled Link Example"})]})]})]})})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Link Usage Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Link usage in actual University at Buffalo academic and administrative contexts"})]}),e.jsxs(r,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Navigation:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Quick Academic Links"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Enrollment:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"/register",children:"Course Registration"})}),e.jsx("div",{children:e.jsx(i,{href:"/schedule",children:"View Class Schedule"})}),e.jsx("div",{children:e.jsx(i,{href:"/waitlist",children:"Manage Waitlists"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Records:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"/grades",children:"Current Grades"})}),e.jsx("div",{children:e.jsx(i,{href:"/transcript",children:"Official Transcript"})}),e.jsx("div",{children:e.jsx(i,{href:"/degree-audit",children:"Degree Audit"})})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Services:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Student Life:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"/dining",children:"Dining Services"})}),e.jsx("div",{children:e.jsx(i,{href:"/housing",children:"Housing Portal"})}),e.jsx("div",{children:e.jsx(i,{href:"/activities",children:"Student Activities"})}),e.jsx("div",{children:e.jsx(i,{href:"/recreation",children:"Recreation Center"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Support:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"/library",external:!0,children:"University Libraries"})}),e.jsx("div",{children:e.jsx(i,{href:"/tutoring",children:"Tutoring Center"})}),e.jsx("div",{children:e.jsx(i,{href:"/writing-center",children:"Writing Center"})}),e.jsx("div",{children:e.jsx(i,{href:"/accessibility",children:"Accessibility Services"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Career & Financial:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"/career-services",children:"Career Services"})}),e.jsx("div",{children:e.jsx(i,{href:"/financial-aid",children:"Financial Aid"})}),e.jsx("div",{children:e.jsx(i,{href:"/bursar",children:"Student Accounts"})}),e.jsx("div",{children:e.jsx(i,{href:"/scholarships",children:"Scholarships"})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Information Display:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 - Algorithm Analysis and Design"}),e.jsx(a,{variant:"body-md",color:"primary",children:"This course provides an introduction to the design and analysis of algorithms. Students will learn fundamental algorithmic paradigms and complexity analysis techniques."}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(i,{variant:"button",href:"/enroll/cse331",children:"Enroll Now"}),e.jsx(i,{variant:"ghost",href:"/syllabus/cse331",children:"View Syllabus"}),e.jsx(i,{variant:"underline",href:"/prerequisites/cse331",children:"Check Prerequisites"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"secondary",children:"Related Resources:"}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(i,{href:"https://algo.buffalo.edu",external:!0,size:"sm",children:"Course Website"}),e.jsx(i,{href:"https://piazza.com/buffalo/spring2024/cse331",external:!0,size:"sm",children:"Piazza Discussion"}),e.jsx(i,{href:"https://autolab.buffalo.edu",external:!0,size:"sm",children:"Assignment Portal"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Emergency & Important Links:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Emergency Services:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"tel:716-645-2222",color:"ruby",children:"UB Emergency: (716) 645-2222"})}),e.jsx("div",{children:e.jsx(i,{href:"/safety",children:"Campus Safety"})}),e.jsx("div",{children:e.jsx(i,{href:"/health-services",children:"Student Health Services"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Contact:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsxs(i,{href:"mailto:registrar@buffalo.edu",children:[e.jsx(m,{icon:N,size:"sm",className:"inline mr-1"}),"Registrar Office"]})}),e.jsx("div",{children:e.jsxs(i,{href:"tel:716-645-8900",children:[e.jsx(m,{icon:k,size:"sm",className:"inline mr-1"}),"Student Services"]})}),e.jsx("div",{children:e.jsxs(i,{href:"https://buffalo.edu",external:!0,children:[e.jsx(m,{icon:L,size:"sm",className:"inline mr-1"}),"UB Homepage"]})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"External Academic Resources:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Access these external resources for enhanced academic research and collaboration:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Tools:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"https://scholar.google.com",external:!0,children:"Google Scholar"})}),e.jsx("div",{children:e.jsx(i,{href:"https://www.jstor.org",external:!0,children:"JSTOR Academic Papers"})}),e.jsx("div",{children:e.jsx(i,{href:"https://pubmed.ncbi.nlm.nih.gov",external:!0,children:"PubMed Health Sciences"})}),e.jsx("div",{children:e.jsx(i,{href:"https://arxiv.org",external:!0,children:"arXiv Preprints"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Development Tools:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{children:e.jsx(i,{href:"https://github.com",external:!0,children:"GitHub"})}),e.jsx("div",{children:e.jsx(i,{href:"https://stackoverflow.com",external:!0,children:"Stack Overflow"})}),e.jsx("div",{children:e.jsx(i,{href:"https://replit.com",external:!0,children:"Replit Online IDE"})}),e.jsx("div",{children:e.jsx(i,{href:"https://colab.research.google.com",external:!0,children:"Google Colab"})})]})]})]})]})]})]})]})]})},o={args:{variant:"default",size:"md",color:"primary",external:!1,disabled:!1,href:"https://buffalo.edu",children:"University at Buffalo"},render:h=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsx(t,{children:"Link Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different link configurations"})]}),e.jsx(r,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs(a,{variant:"body-md",color:"primary",children:["Click to visit: ",e.jsx(i,{...h})]}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive link testing for University at Buffalo navigation patterns"})]})})]})})};var v,x,p;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    external: false,
    disabled: false,
    href: 'https://buffalo.edu',
    children: 'University at Buffalo'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Visit the official{' '}
            <Link {...args} />
            {' '}website for more information.
          </Text>
          <Text variant="body-sm" color="secondary">
            Default link styling for University at Buffalo navigation
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(p=(x=c.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var u,g,y;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎭 VARIANTS</Badge>
            Link Variants - Navigation Styles
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants for different link contexts and user interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard Links:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="default" href="https://buffalo.edu">University at Buffalo Homepage</Link>
                    </div>
                    <div>
                      <Link variant="default" href="https://registrar.buffalo.edu">Academic Records</Link>
                    </div>
                    <div>
                      <Link variant="default" href="https://buffalo.edu/campus-life">Campus Life</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">With External Indicators:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="default" href="https://scholar.google.com" external>Google Scholar</Link>
                    </div>
                    <div>
                      <Link variant="default" href="https://github.com" external>GitHub</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Ghost Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Subtle Navigation:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="ghost" href="/courses">Browse Courses</Link>
                    </div>
                    <div>
                      <Link variant="ghost" href="/schedule">My Schedule</Link>
                    </div>
                    <div>
                      <Link variant="ghost" href="/grades">View Grades</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Underline Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Inline Text Links:</Text>
                  <Text variant="body-md" color="primary">
                    Students can access their academic records through the{' '}
                    <Link variant="underline" href="/student-portal">Student Portal</Link>
                    {' '}or contact the{' '}
                    <Link variant="underline" href="/registrar">Office of the Registrar</Link>
                    {' '}for assistance with enrollment questions.
                  </Text>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Button Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Call-to-Action Links:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Link variant="button" href="/register">Register for Courses</Link>
                    <Link variant="button" href="/apply">Apply Now</Link>
                    <Link variant="button" href="/visit">Schedule Campus Visit</Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Link Sizes - Typography Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for seamless integration with different text contexts and hierarchy levels
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">
                      See{' '}<Link size="sm" href="/terms">Terms of Service</Link>{' '}for details.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="sm" variant="button" href="/help">Help</Link>
                      <Link size="sm" variant="ghost" href="/support">Support</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="space-y-2">
                    <Text variant="body-md" color="primary">
                      Access your{' '}<Link size="md" href="/dashboard">Academic Dashboard</Link>{' '}here.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="md" variant="button" href="/courses">Browse Courses</Link>
                      <Link size="md" variant="ghost" href="/calendar">View Calendar</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="space-y-2">
                    <Text variant="body-lg" color="primary">
                      Welcome to{' '}<Link size="lg" href="/">HIVE</Link>{' '}at University at Buffalo.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="lg" variant="button" href="/get-started">Get Started</Link>
                      <Link size="lg" variant="ghost" href="/learn-more">Learn More</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Color Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎨 COLORS</Badge>
            Link Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 semantic colors for consistent brand expression and visual hierarchy
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Hierarchy Colors:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Primary:</Text>
                  <Link color="primary" href="/academics">Academic Programs</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Secondary:</Text>
                  <Link color="secondary" href="/resources">Additional Resources</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Muted:</Text>
                  <Link color="muted" href="/archive">Archived Content</Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Colors:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Gold (HIVE Brand):</Text>
                  <Link color="gold" href="/featured">Featured Content</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Button Variants:</Text>
                  <div className="flex gap-2">
                    <Link variant="button" color="primary" href="/action">Primary Action</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔗 EXTERNAL</Badge>
            External Links - Security & Indicators
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Automatic external link handling with security attributes and visual indicators
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">External Link Examples:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Resources:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://scholar.google.com" external>Google Scholar</Link></div>
                    <div><Link href="https://pubmed.ncbi.nlm.nih.gov" external>PubMed</Link></div>
                    <div><Link href="https://www.jstor.org" external>JSTOR</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">University Partners:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://www.suny.edu" external>SUNY System</Link></div>
                    <div><Link href="https://www.aau.edu" external>Association of American Universities</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://github.com" external>GitHub</Link></div>
                    <div><Link href="https://stackoverflow.com" external>Stack Overflow</Link></div>
                    <div><Link href="https://linkedin.com" external>LinkedIn</Link></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* States Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">⚡ STATES</Badge>
            Link States - Interactive Feedback
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete interactive state system for accessible and responsive link behavior
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal State:</Text>
                  <Link href="/normal">Standard Link Appearance</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Hover State (hover over links):</Text>
                  <Link href="/hover">Hover for Color Change</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Focus State (tab to focus):</Text>
                  <Link href="/focus">Tab to See Focus Ring</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                  <Link disabled>Disabled Link Example</Link>
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
            Real Campus Link Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Link usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Quick Academic Links
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Enrollment:</Text>
                    <div className="space-y-2">
                      <div><Link href="/register">Course Registration</Link></div>
                      <div><Link href="/schedule">View Class Schedule</Link></div>
                      <div><Link href="/waitlist">Manage Waitlists</Link></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Records:</Text>
                    <div className="space-y-2">
                      <div><Link href="/grades">Current Grades</Link></div>
                      <div><Link href="/transcript">Official Transcript</Link></div>
                      <div><Link href="/degree-audit">Degree Audit</Link></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Services:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Life:</Text>
                  <div className="space-y-2">
                    <div><Link href="/dining">Dining Services</Link></div>
                    <div><Link href="/housing">Housing Portal</Link></div>
                    <div><Link href="/activities">Student Activities</Link></div>
                    <div><Link href="/recreation">Recreation Center</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Support:</Text>
                  <div className="space-y-2">
                    <div><Link href="/library" external>University Libraries</Link></div>
                    <div><Link href="/tutoring">Tutoring Center</Link></div>
                    <div><Link href="/writing-center">Writing Center</Link></div>
                    <div><Link href="/accessibility">Accessibility Services</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Career & Financial:</Text>
                  <div className="space-y-2">
                    <div><Link href="/career-services">Career Services</Link></div>
                    <div><Link href="/financial-aid">Financial Aid</Link></div>
                    <div><Link href="/bursar">Student Accounts</Link></div>
                    <div><Link href="/scholarships">Scholarships</Link></div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Course Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Information Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis and Design
                </Text>
                
                <Text variant="body-md" color="primary">
                  This course provides an introduction to the design and analysis of algorithms. 
                  Students will learn fundamental algorithmic paradigms and complexity analysis techniques.
                </Text>
                
                <div className="flex flex-wrap gap-4">
                  <Link variant="button" href="/enroll/cse331">Enroll Now</Link>
                  <Link variant="ghost" href="/syllabus/cse331">View Syllabus</Link>
                  <Link variant="underline" href="/prerequisites/cse331">Check Prerequisites</Link>
                </div>
                
                <div className="space-y-2">
                  <Text variant="body-sm" color="secondary">
                    Related Resources:
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <Link href="https://algo.buffalo.edu" external size="sm">Course Website</Link>
                    <Link href="https://piazza.com/buffalo/spring2024/cse331" external size="sm">Piazza Discussion</Link>
                    <Link href="https://autolab.buffalo.edu" external size="sm">Assignment Portal</Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Emergency & Important Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Emergency & Important Links:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Emergency Services:</Text>
                  <div className="space-y-2">
                    <div><Link href="tel:716-645-2222" color="ruby">UB Emergency: (716) 645-2222</Link></div>
                    <div><Link href="/safety">Campus Safety</Link></div>
                    <div><Link href="/health-services">Student Health Services</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Contact:</Text>
                  <div className="space-y-2">
                    <div><Link href="mailto:registrar@buffalo.edu">
                      <Icon icon={Mail} size="sm" className="inline mr-1" />
                      Registrar Office
                    </Link></div>
                    <div><Link href="tel:716-645-8900">
                      <Icon icon={Phone} size="sm" className="inline mr-1" />
                      Student Services
                    </Link></div>
                    <div><Link href="https://buffalo.edu" external>
                      <Icon icon={Globe} size="sm" className="inline mr-1" />
                      UB Homepage
                    </Link></div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* External Academic Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">External Academic Resources:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Access these external resources for enhanced academic research and collaboration:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://scholar.google.com" external>Google Scholar</Link></div>
                    <div><Link href="https://www.jstor.org" external>JSTOR Academic Papers</Link></div>
                    <div><Link href="https://pubmed.ncbi.nlm.nih.gov" external>PubMed Health Sciences</Link></div>
                    <div><Link href="https://arxiv.org" external>arXiv Preprints</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Development Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://github.com" external>GitHub</Link></div>
                    <div><Link href="https://stackoverflow.com" external>Stack Overflow</Link></div>
                    <div><Link href="https://replit.com" external>Replit Online IDE</Link></div>
                    <div><Link href="https://colab.research.google.com" external>Google Colab</Link></div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var f,j,b;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    color: 'primary',
    external: false,
    disabled: false,
    href: 'https://buffalo.edu',
    children: 'University at Buffalo'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Link Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different link configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Text variant="body-md" color="primary">
              Click to visit: <Link {...args} />
            </Text>
            <Text variant="body-sm" color="secondary">
              Interactive link testing for University at Buffalo navigation patterns
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(b=(j=o.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};const G=["Default","CompleteShowcase","Playground"];export{l as CompleteShowcase,c as Default,o as Playground,G as __namedExportsOrder,V as default};
